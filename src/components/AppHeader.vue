<script>
import { store } from "../store.js";

export default {
    name: "AppHeader",
    data() {
        return {
            store
        };
    },
    methods: {
        // Funzione per rimuovere elementi dal carrello
        deleteFromCart(element) {
            JSON.parse(sessionStorage.getItem('cart'))
            this.store.cart.splice(element, 1)

            sessionStorage.setItem('cart', JSON.stringify(this.store.cart))


            console.log('sono pippo')
            if (this.store.cart.length == 0) {
                this.store.checkRestaurant = null;
                console.log(sessionStorage)
                sessionStorage.clear()
                console.log(sessionStorage)
            }
        },
    },
    computed: {
        // Funzione per calcolare il prezzo totale del checkout
        totalPrice() {
            let totalPrice = 0;

            this.store.cart.forEach(item => {
                totalPrice += item.itemPrice * item.itemQuantity;
            });

            return totalPrice;
        },
    }
}
</script>

<template>
    <header class="w-100">
        <div class="container-sm d-flex justify-content-between align-items-center h-100">
            <!-- Logo -->
            <div class="ms_logo h-100">
                <router-link :to="{ name: 'home' }">
                    <img class="h-100" src="../../public/logo.gif" alt="logo" />
                </router-link>
            </div>
            <!-- Navbar -->
            <nav class="ms_navbar d-none d-md-block h-100">
                <ul class="list-unstyled">
                    <li class="d-inline-block">
                        <a class="text-decoration-none" href="/">Home</a>
                    </li>
                    <li class="d-inline-block">
                        <a class="text-decoration-none" href="/ristoranti">Ristoranti</a>
                    </li>
                </ul>
            </nav>
            <!-- Dropdown Menu -->
            <div class="dropdown-center d-md-none">
                <i class="fa-solid fa-bars h-100" data-bs-toggle="dropdown"></i>
                <ul class="dropdown-menu">
                    <li><router-link class="dropdown-item" :to="{ name: 'home' }">Home</router-link></li>
                    <li><router-link class="dropdown-item" :to="{ name: 'ristoranti' }">Ristoranti</router-link></li>
                </ul>
            </div>

            <div class="ms_button h-100 d-flex align-items-center">
                <!-- Pulsante per il login all'area ristoratori -->
                <div class="me-2">
                    <a href="http://127.0.0.1:8000/login" class="text-decoration-none fw-semibold">Area Ristoratori</a>
                </div>

                <!-- Bottone per il carrello da desktop -->
                <div class="position-relative d-none d-lg-block">
                    <button class="ms_cart position-relative border-0" @click="store.isCartOpen = !store.isCartOpen">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                    <!-- Notifica oggetti contenuti nel carrello -->
                    <div v-if="this.store.cart.length > 0" class="ms_quantity-badge badge rounded-pill position-absolute">
                        {{ this.store.cart.length }}
                    </div>

                    <!-- Transition in dropdown per dettaglio carrello -->
                    <Transition class="mt-3">
                        <div v-if="store.isCartOpen" class="ms_cart-details position-absolute rounded-3">
                            <h6 class="fw-bold p-3 m-0">Carrello</h6>

                            <hr class="m-0" />

                            <div v-if="store.cart.length > 0">
                                <div class="ms_cart-items-list m-3">

                                    <div v-for="(element, index) in this.store.cart" class="ms_cart-item d-flex">
                                        <!-- Immagine prodotto -->
                                        <img v-if="element.itemImage"
                                            :src="`${this.store.baseUrl}/storage/${element.itemImage}`"
                                            class="ms_cart-image img-fluid" />
                                        <img v-else
                                            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                                            class="ms_cart-image img-fluid" alt="no image">

                                        <!-- Nome prodotto -->
                                        <div class="ms_cart-product-details d-flex flex-column ms-2">
                                            <span class="d-block fw-bold">{{ element.itemName }}</span>

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

                                <div class="ms_checkout">
                                    <!-- Bottone per procedere al checkout -->
                                    <router-link :to="{ name: 'checkout' }" class="btn fw-bold text-white rounded-pill">
                                        CHECKOUT: €{{ totalPrice.toFixed(2).replace(".", ",") }}
                                    </router-link>
                                </div>
                            </div>

                            <!-- In caso di carrello vuoto -->
                            <div v-else class="cart-empty text-center p-3">
                                <span>Carrello vuoto</span>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";

header {
    height: 100px;
    background-color: $color-black;

    & .container-sm {

        & .ms_logo {

            & img {
                line-height: 100px;
            }
        }

        & .ms_navbar {
            line-height: 100px;

            & ul {

                & li {
                    position: relative;

                    & a {
                        padding: 2rem 1.5rem;
                        color: $primary-color;

                        &:before {
                            content: '';
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            width: 100%;
                            height: 2px;
                            background-color: $primary-color;
                            border-radius: 4px;
                            scale: 0 1;
                            transform-origin: right;
                            transition: scale 0.5s;
                        }

                        &:hover::before {
                            scale: 1;
                            transform-origin: left;
                        }
                    }
                }
            }
        }
    }

    & .dropdown-center {

        & .dropdown-menu {
            width: 100vh;
            background-color: $secondary-color;

            & li a {
                color: $primary-color;
                padding: 1rem 0 1rem 2rem;
            }
        }
    }

    & .fa-bars {
        font-size: 1.6rem;
        color: $primary-color;
        cursor: pointer;
        line-height: 100px;
    }

    & .ms_button {

        & a {
            color: $secondary-color;
            padding: 0.5rem 1rem;
            background-color: $primary-color;
            border-radius: 15px;
            line-height: 100px;
        }

        & .ms_cart {
            color: $secondary-color;
            padding: 0.5rem 1rem;
            background-color: $primary-color;
            border-radius: 15px;
        }

        & .ms_quantity-badge {
            background-color: $third-color;
            color: $color-white;
            top: -8px;
            right: -8px;
        }

        & .ms_cart-details {
            width: 400px;
            min-height: 100px;
            top: 80%;
            right: 0;
            background-color: $color-white;
            z-index: 1005;

            & .ms_cart-items-list {
                max-height: 350px;
                overflow: auto;

                &::-webkit-scrollbar {
                    display: none;
                }

                & .ms_cart-item {

                    &:not(:last-child) {
                        margin-bottom: 1rem;
                    }

                    & .ms_cart-image {
                        width: 3rem;
                        height: 3rem;
                        object-fit: cover;
                    }
                }
            }

            & .ms_checkout {
                padding: 10px;

                & .btn {
                    line-height: 30px;
                    width: 100%;
                }
            }
        }
    }
}


/* Interazioni */
header .container-sm .ms_navbar ul li a:hover {
    color: $primary-alternative-color;
}

.ms_button a:hover {
    background-color: $primary-alternative-color;
    color: $color-white;
}

.ms_button .ms_cart:hover {
    background-color: $primary-alternative-color;
    color: $color-white;
}
</style>