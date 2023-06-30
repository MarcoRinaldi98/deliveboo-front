<script>
import axios from 'axios';
import { store } from '../store.js';
import dropin from 'braintree-web-drop-in';

export default {
    name: "AppCheckout",
    data() {
        return {
            store,
            isLoading: false,
            orderInfo: {
                guest_name: "",
                guest_surname: "",
                guest_address: "",
                guest_email: "",
                guest_phone: "",
                
            },
            // totalPrice: totalPrice(),
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
        getToken() {
            let token = axios.get('http://localhost:8000/api/generate-client-token')
            console.log('ciao')
                .catch(error => {
                    console.log('Token request failed: ' + error.message);
                    return
                });
            return token;
        },
            async getPaymentData() {
            // Create a client-side Braintree instance
            const clientToken = await this.getToken();

            let that = this;
            if (clientToken) {
                this.isUserPaying = true;
                const instance = await dropin.create({
                    authorization: clientToken.data.clientToken,
                    selector: '#dropin-container',
                    locale: 'it_IT'
                }, function (err, dropinInstance) {
                    const submitBtn = document.getElementById('submit-payment-btn');

                    submitBtn.addEventListener('click', function () {
                        this.classList.add('disabled');
                        dropinInstance.requestPaymentMethod(function (err, payload) {
                            if (err) {
                                submitBtn.classList.remove('disabled');
                            }
                            // Send the nonce to your Laravel backend for server-side processing

                            axios.post('http://localhost:8000/api/process-payment', {
                                paymentMethodNonce: payload.nonce,
                                order: that.orderInfo,
                            }).then(response => {

                                if (response.data.success == true) {
                                    that.emptyCart();
                                    that.$router.push({ name: 'checkout-success', params: { orderCode: response.data.orderCode } });
                                } else {
                                    submitBtn.classList.remove('disabled');
                                }
                            })


                        })
                    })
                })


            } else {
                console.log('Dropin creation failed: token not found');
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
    },
}}
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
                                                    €{{ element.itemTotalPrice}}
                                                </span>
                                            </div>

                                            <div class="item-price-delete d-flex align-items-center ms-auto">
                                                <span class="text-success fw-bold me-2 d-none d-sm-block">
                                                    €{{ element.itemTotalPrice}}
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
                            Totale: <span class="text-success fw-bold">€{{ totalPrice}}</span>
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
                                <input type="text" class="form-control" id="customer_name" v-model="orderInfo.guest_name" />
                                <div class="invalid-feedback">
                                    Name
                                </div>
                            </div>
                            <!-- Insermiento del cognome dell'utente -->
                            <div class="mb-3">
                                <label for="guest_surname" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="customer_surname" v-model="orderInfo.guest_surname" />
                                <div class="invalid-feedback">
                                    Surname
                                </div>
                            </div>
                            <!-- Insermiento indirizzo dell'utente -->
                            <div class="mb-3">
                                <label for="guest_address" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="customer_address" v-model="orderInfo.guest_address" />
                                <div class="invalid-feedback">
                                    Indirizzo
                                </div>
                            </div>
                            <!-- Insermineto email dell'utente -->
                            <div class="mb-3">
                                <label for="guest_mail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="customer_mail" v-model="orderInfo.guest_mail" />
                                <div class="invalid-feedback">
                                    Email
                                </div>
                            </div>
                            <!-- Insermineto del numero di telefono dell'utente -->
                            <div class="mb-3">
                                <label for="guest_phone" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="customer_phone_number" maxlength="11"
                                    v-model="orderInfo.guest_phone" />
                                <div class="invalid-feedback">
                                    Phone
                                </div>
                            </div>

                        </form>
                        <div id="dropin-container"></div>

                        <div class="container_button">
                            <button id="submit-payment-btn">Conferma pagamento</button>
                        </div>
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
