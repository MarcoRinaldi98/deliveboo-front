<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: "AppCheckout",
    data() {
        return {
            store,
            isLoading: false,
            formData: {
                guest_name: "",
                guest_surname: "",
                guest_address: "",
                guest_email: "",
                guest_phone: "",
                nonce: ""
            }
        }
    },
    methods: {
        // Funzione per rimuovere elementi dal carrello
        deleteFromCart(element) {
            JSON.parse(sessionStorage.getItem('cart'))
            this.store.cart.splice(element, 1)
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart))
        },
        // Funzione che emette una chiamata axios per inviare i dati contenuti in formData al backend
        submitForm() {
            axios.post(`${this.store.baseUrl}/api/order`, this.formData)
                .then((response) => {
                    this.errors = [];
                    this.$router.push({ name: "order-sent" });
                })
                .catch((error) => {
                    this.errors = error.response.data.errors;
                    this.isLoading = false;
                });
        }
    },
    computed: {
        // Funzione per calcolare il prezzo totale dell'ordine
        totalPrice() {
            let totalPrice = 0;

            this.store.cart.forEach((item) => {
                totalPrice += item.itemPrice * item.itemQuantity;
            });

            return totalPrice;
        },
    },
    mounted() {
        this.store.isCartOpen = false;

        var button = document.querySelector('#submit-button');

        braintree.dropin.create({
        // Insert your tokenization key here
        authorization: 'sandbox_q7f3vc9y_2jv4wxd4xy24hfqd',
        container: '#dropin-container'
        }, function (createErr, instance) {
        button.addEventListener('click', function () {
            instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
            // When the user clicks on the 'Submit payment' button this code will send the
            // encrypted payment information in a variable called a payment method nonce
            $.ajax({
                type: 'POST',
                url: '/checkout',
                data: {'paymentMethodNonce': payload.nonce}
            }).done(function(result) {
                // Tear down the Drop-in UI
                instance.teardown(function (teardownErr) {
                if (teardownErr) {
                    console.error('Could not tear down Drop-in UI!');
                } else {
                    console.info('Drop-in UI has been torn down!');
                    // Remove the 'Submit payment' button
                    $('#submit-button').remove();
                }
                });

                if (result.success) {
                $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
                } else {
                console.log(result);
                $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
                }
            });
            });
        });
        });
    },
}
</script>

<template>
    <section id="checkout">
        <div class="container-sm py-5">
            <div class="row mt-2 gx-4 gy-4 gy-lg-0">
                <!-- Riepilogo prodotti nel carrello/ordine -->
                <div class="col-12 col-lg-6">
                    <div class="ms_form-content border h-100 rounded-3 d-flex flex-column">
                        <div class="form-title p-3">
                            <h3 class="m-0 fw-bold">Riepilogo ordine ({{ new Date().toLocaleDateString() }})
                            </h3>
                        </div>

                        <hr class="m-0" />

                        <div class="ms_order-items-content d-flex flex-column p-3 gap-3">
                            <div class="ms_card">
                                <div v-for="(element, index) in this.store.cart" class="row ms_card-row">
                                    <!-- Immagine prodotto -->
                                    <div class="col-4 h-100">
                                        <img :src="`${this.store.baseUrl}/storage/${element.itemImage}`"
                                            class="rounded-start" alt="image" />
                                    </div>
                                    <div class="col-8 h-100 ps-0">
                                        <div class="ms_card-body d-flex align-items-center h-100 ps-0">
                                            <div class="card-details">
                                                <!-- Nome prodotto -->
                                                <h5 class="card-title m-0">{{ element.itemName }}</h5>
                                                <!-- Quantità prodotto -->
                                                <small class="fst-italic m-0">Quantità: {{ element.itemQuantity }}</small>
                                                <!-- Costo prodotto -->
                                                <span class="text-success fw-bold me-2 d-block d-sm-none">
                                                    €{{ element.itemTotalPrice.toFixed(2).replace(".", ",") }}
                                                </span>
                                            </div>

                                            <div class="item-price-delete d-flex align-items-center ms-auto">
                                                <span class="text-success fw-bold me-2 d-none d-sm-block">
                                                    €{{ element.itemTotalPrice.toFixed(2).replace(".", ",") }}
                                                </span>

                                                <!-- cestino per rimuovere l'elemento dall'ordine/carrello -->
                                                <button @click="deleteFromCart(element)" class="btn border-0 ms-auto">
                                                    <i class="fa-regular fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr class="m-0 mt-auto" />
                        <!-- Importo totale -->
                        <h3 class="text-end mb-0 p-3 fw-regular">
                            Totale: <span class="text-success fw-bold">€{{ totalPrice.toFixed(2).replace(".", ",") }}</span>
                        </h3>
                    </div>
                </div>

                <!-- Box form dati utente -->
                <div class="col-12 col-lg-6 position-relative">
                    <div v-if="isLoading"
                        class="ms_driver-loader position-absolute top-0 end-0 bottom-0 start-0 d-flex justify-content-center align-items-start">
                        <img src="../../public/logo.gif" alt="Loading" />
                    </div>

                    <div class="ms_form-content border rounded-3">
                        <div class="form-title p-3">
                            <h3 class="m-0 fw-bold">Inserisci i dati per la consegna</h3>
                        </div>

                        <hr class="m-0" />

                        <form class="p-3" method="POST">
                            <!-- Insermiento del nome dell'utente -->
                            <div class="mb-3">
                                <label for="guest_name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="customer_name" v-model="guest_name" />
                                <div class="invalid-feedback">
                                    Name
                                </div>
                            </div>
                            <!-- Insermiento del cognome dell'utente -->
                            <div class="mb-3">
                                <label for="guest_surname" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="customer_surname" v-model="guest_surname" />
                                <div class="invalid-feedback">
                                    Surname
                                </div>
                            </div>
                            <!-- Insermiento indirizzo dell'utente -->
                            <div class="mb-3">
                                <label for="guest_address" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="customer_address" v-model="guest_address" />
                                <div class="invalid-feedback">
                                    Indirizzo
                                </div>
                            </div>
                            <!-- Insermineto email dell'utente -->
                            <div class="mb-3">
                                <label for="guest_mail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="customer_mail" v-model="guest_mail" />
                                <div class="invalid-feedback">
                                    Email
                                </div>
                            </div>
                            <!-- Insermineto del numero di telefono dell'utente -->
                            <div class="mb-3">
                                <label for="guest_phone" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="customer_phone_number" maxlength="11"
                                    v-model="guest_phone" />
                                <div class="invalid-feedback">
                                    Phone
                                </div>
                            </div>

                            <!-- elemento gestito da e per braintree -->
                            <div id="dropin-wrapper">
                                <div id="checkout-message"></div>
                                <div id="dropin-container"></div>
                                <button id="submit-button">Submit payment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";
@import "../styles/partials/mixins";

section {
    @include bg-image;

    & .ms_form-content {
        background-color: $secondary-color;
        color: $primary-color;

        & .ms_order-items-content {

            & .ms_card {
                background-color: $secondary-color;

                & .ms_card-row {
                    height: max(90px, 80px);
                    margin: 5px 0;
                    background-color: $color-white;
                    border-radius: 5px;

                    & .ms_card-body {
                        color: $secondary-color;
                    }
                }
            }
        }
    }
}

.ms_driver-loader {
    padding: inherit;
    z-index: 1001;

    &>img {
        object-fit: contain;
        width: 50%;
    }
}

img {
    width: 100%;
    min-height: 80px;
    height: 100%;
    object-fit: cover;
}

#submit-button {
    background-color: $primary-color;
}
</style>
