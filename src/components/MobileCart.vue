<script>
import { store } from "../store.js";

export default {
    name: "MobileCart",
    data() {
        return {
            store,
        };
    },
    methods: {
        deleteFromCart(element) {
            let newItem = JSON.parse(sessionStorage.getItem('cart'))
            this.store.cart.splice(element, 1)
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart))
        },
        getCart() {
            this.store.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            console.log(sessionStorage.getItem('cart'))
        }
    },
    computed: {
        totalItemAmount() {
            let totalItems = 0;

            (this.store.cart).forEach((item) => {
                totalItems += item.itemQuantity;
            });

            return totalItems;
        },
        totalPrice() {
            let totalPrice = 0;

            this.store.cart.forEach((item) => {
                totalPrice += item.itemPrice * item.itemQuantity;
            });

            return totalPrice;
        },
    },
    mounted() {
        this.getCart();
    }
}
</script>

<template>
    <div class="d-block d-lg-none">
        <!-- Bottone per il carrello da mobile -->
        <button class="ms_cart-mobile-button position-fixed m-4 rounded-circle" @click="store.isCartOpen = true">
            <i class="fa-solid fa-cart-shopping"></i>

            <!-- Notifica oggetti contenuti nel carrello -->
            <div v-if="this.store.cart.length > 0" class="ms_quantity-badge rounded-pill">
                <span>{{ this.store.cart.length }}</span>
            </div>
        </button>
        <!-- Canvas per dettaglio carrello -->
        <div class="ms_menu-layover position-fixed top-0 end-0 bottom-0 start-0" v-if="store.isCartOpen">
            <div class="row">
                <div class="col-2 col-sm-3 col-md-5"></div>
                <div class="col-10 col-sm-9 col-md-7">
                    <div class="ms_menu-layover-content p-4 d-flex flex-column">
                        <!-- Bottone per chiudere il carrello -->
                        <button class="ms_close-cart-button btn text-danger fw-bolder border-0 ps-0 text-start"
                            @click="store.isCartOpen = false">
                            <i class="fa-solid fa-x"></i>
                        </button>

                        <h2 class="mt-2 mb-0 fw-bold">Carrello</h2>

                        <hr />

                        <div v-if="store.cart.length > 0" class="ms_cart-item-container d-flex flex-column flex-grow-1">
                            <div class="ms_cart-items-list mb-3">
                                <div v-for="(element, index) in this.store.cart"
                                    class="ms_cart-item d-flex align-items-center">
                                    <!-- Immagine prodotto -->
                                    <img :src="`${this.store.baseUrl}/storage/${element.itemImage}`"
                                        class="ms_cart-image img-fluid" />

                                    <!-- Nome prodotto -->
                                    <div class="cart-product-details d-flex flex-column ms-3">
                                        <h5 class="d-block mb-0 fw-bold">{{ element.itemName }}</h5>

                                        <!-- Costo prodotto e quantità -->
                                        <div class="ms_cart-product-prices d-flex">
                                            <span>
                                                €{{ element.itemPrice.toFixed(2).replace(".", ",") }} x {{
                                                    element.itemQuantity }}
                                            </span>
                                            <span class="ms-2 text-success fw-bold">
                                                €{{ element.itemTotalPrice.toFixed(2).replace(".", ",") }}
                                            </span>
                                        </div>
                                    </div>

                                    <!-- cestino per rimuovere l'elemento dall'carrello -->
                                    <button @click="deleteFromCart(element)" class="btn border-0 ms-auto">
                                        <i class="fa-regular fa-trash-can"></i>
                                    </button>
                                </div>

                            </div>

                            <!-- Bottone per procedere al checkout -->
                            <div class="mt-auto">
                                <router-link :to="{ name: 'checkout' }"
                                    class="btn ms_color-btn fw-bold text-white w-100 rounded-pill">
                                    CHECKOUT: €{{ totalPrice.toFixed(2).replace(".", ",") }}
                                </router-link>
                            </div>
                        </div>

                        <!-- In caso di carrello vuoto -->
                        <div v-else class="ms_cart-empty text-center p-3">
                            <span>Carrello vuoto</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";

.ms_cart-mobile-button {
    z-index: 1002;
    bottom: 0;
    left: 0;
    width: 3.5rem;
    height: 3.5rem;
    background-color: $primary-color;
    border: 1.5px solid $color-black;
    box-shadow: 0 0px 20px 3px rgba($color: $color-black, $alpha: 0.25);

    & .ms_quantity-badge {
        position: absolute;
        border: 1.5px solid $color-black;
        background-color: $third-color;
        color: $color-white;
        top: -8px;
        right: -8px;
        min-width: 1.5rem;
        font-size: 0.8rem;
    }
}

.ms_menu-layover {
    background-color: rgba($color: $color-black, $alpha: 0.5);
    width: 100vw;
    height: 100vh;
    z-index: 1004;

    & .ms_menu-layover-content {
        background-color: $color-white;
        height: 100vh;

        & .ms_close-cart-button {
            width: fit-content;
        }

        & .ms_cart-item-container {
            overflow: auto;

            & .ms_cart-items-list {
                overflow: auto;

                & .ms_cart-item:not(:last-child) {
                    margin-bottom: 1rem;
                }

                & .ms_cart-image {
                    width: 4.5rem;
                    height: 4.5rem;
                    object-fit: cover;
                }
            }

            & .ms_color-btn {
                background-color: $primary-color;

                &:active {
                    background-color: $primary-alternative-color;
                }
            }
        }
    }
}
</style>
