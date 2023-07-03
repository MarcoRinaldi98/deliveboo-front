<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: "AppCheckout",
    data() {
        return {
            store,
            isLoading: false,
            guest_name: "",
            guest_surname: "",
            guest_address: "",
            guest_email: "",
            guest_phone: "",
            status: "",
            restaurant_id: "",
            dropinInstance: null,
            nonce: "",
            jason: '',
        };
    },
    methods: {
        deleteFromCart(index) {
            this.store.cart.splice(index, 1);
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
        submitForm() {
            if (!this.store.cart.length) {
                alert('Il carrello è vuoto');
                return;
            }

            const formData = {
                guest_name: this.guest_name,
                guest_surname: this.guest_surname,
                guest_address: this.guest_address,
                guest_email: this.guest_email,
                guest_phone: this.guest_phone,
                amount: this.totalPrice.toFixed(2),
                status: 0,
                date: new Date().toISOString().slice(0, 10),
                restaurant_id: "",
                nonce: this.nonce,
                jason: sessionStorage,
            };

            delete formData.updated_at;
            delete formData.created_at;

            if (this.dropinInstance) {
                this.dropinInstance.requestPaymentMethod((err, payload) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    formData.nonce = payload.nonce;
                    formData.restaurant_id = this.store.cart[0].itemRestaurantId;

                    axios.post("http://127.0.0.1:8000/api/order", formData)
                        .then(response => {
                            console.log(response.data);
                            if (response.data.status === "payment_accepted") {
                                console.log(response);
                                formData.status = 1;
                            }

                            this.resetForm();
                            this.resetCart();
                            this.$router.push({ name: 'order-sent' });
                        })
                        .catch(error => {
                            console.error(error);
                        });
                });
            }
        },
        resetForm() {
            this.guest_name = "";
            this.guest_surname = "";
            this.guest_address = "";
            this.guest_email = "";
            this.guest_phone = "";
            this.nonce = "";
        },
        resetCart() {
            this.store.cart = [];
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
        },
        initBraintreeDropin() {
            const self = this;
            const button = document.querySelector('#submit-button');

            braintree.dropin.create({
                authorization: 'sandbox_nds66d7d_c3ksmy3jwrcb35jv',
                selector: '#dropin-container'
            }, function (err, instance) {
                button.addEventListener('click', () => {
                    instance.requestPaymentMethod((err, payload) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        console.log(payload);
                    });
                });

                self.dropinInstance = instance;
            });
        },
    },
    computed: {
        totalPrice() {
            let totalPrice = 0;

            this.store.cart.forEach((item) => {
                totalPrice += item.itemPrice * item.itemQuantity;
            });

            return totalPrice;
        }
    },
    mounted() {
        this.store.isCartOpen = false;
        this.initBraintreeDropin();

        // Recupera i dati del carrello dalla sessione
        const cartData = sessionStorage.getItem('cart');
        if (cartData) {
            this.store.cart = JSON.parse(cartData);
        }
    },
};
</script>

<template>
    <section id="checkout">
        <div class="container-sm py-5">
            <div class="row mt-2 gx-4 gy-4 gy-lg-0">
                <!-- Riepilogo prodotti nel carrello/ordine -->
                <div class="col-12 col-lg-6">
                    <div class="ms_form-content border h-100 rounded-3 d-flex flex-column">
                        <div class="form-title p-3">
                            <h3 class="m-0 fw-bold">Riepilogo ordine ({{ new Date().toISOString().slice(0, 10) }})
                            </h3>
                        </div>

                        <hr class="m-0" />

                        <div class="ms_order-items-content d-flex flex-column p-3 gap-3">
                            <div class="ms_card">
                                <div v-for="(element, index) in this.store.cart" class="row ms_card-row">
                                    <!-- Immagine prodotto -->
                                    <div class="col-4 h-100">
                                        <img v-if="element.itemImage"
                                            :src="`${this.store.baseUrl}/storage/${element.itemImage}`"
                                            class="rounded-start" alt="image" />
                                        <img v-else
                                            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                                            class="rounded-start" alt="no image">
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
                                                    €{{ element.itemTotalPrice.toFixed(2) }}
                                                </span>
                                            </div>

                                            <div class="item-price-delete d-flex align-items-center ms-auto">
                                                <span class="text-success fw-bold me-2 d-none d-sm-block">
                                                    €{{ element.itemTotalPrice.toFixed(2) }}
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
                            Totale: <span class="text-success fw-bold">€{{ totalPrice.toFixed(2) }}</span>
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

                        <form class="p-3" @submit.prevent="submitForm" id="submitForm">

                            <div class="mb-3">
                                <label for="guest_name" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="guest_name" v-model="guest_name" />
                                <div class="invalid-feedback">
                                    Name
                                </div>
                            </div>
                            <!-- Inserimento del cognome dell'utente -->
                            <div class="mb-3">
                                <label for="guest_surname" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="guest_surname" v-model="guest_surname" />
                                <div class="invalid-feedback">
                                    Surname
                                </div>
                            </div>

                            <!-- Inserimento indirizzo dell'utente -->
                            <div class="mb-3">
                                <label for="guest_address" class="form-label">Indirizzo</label>
                                <input type="text" class="form-control" id="guest_address" v-model="guest_address" />
                                <div class="invalid-feedback">
                                    Indirizzo
                                </div>
                            </div>

                            <!-- Inserimento email dell'utente -->
                            <div class="mb-3">
                                <label for="guest_email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="guest_email" v-model="guest_email" />
                                <div class="invalid-feedback">
                                    Email
                                </div>
                            </div>

                            <!-- Inserimento del numero di telefono dell'utente -->
                            <div class="mb-3">
                                <label for="guest_phone" class="form-label">Telefono</label>
                                <input type="text" class="form-control" id="guest_phone" maxlength="11"
                                    v-model="guest_phone" />
                                <div class="invalid-feedback">
                                    Phone
                                </div>
                            </div>

                            <div class="mb-3">

                                <div v-for="item in store.cart" :key="item.id">
                                    <input type="text" class="form-control" id="restaurant_id" maxlength="11"
                                        :value="item.itemRestaurantId" hidden />
                                </div>
                                <div class="invalid-feedback">
                                    Restaurant ID
                                </div>

                            </div>

                            <div id="dropin-container"></div>

                            <button id="submit-button" type="submit" class="btn w-100 rounded-pill text-white">
                                Invia l'ordine
                            </button>
                        </form>
                        <div class="alert alert-success d-none mx-2" role="alert" id="alert">
                            Ordine effettuato con successo!
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
