<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: "RestaurantMenu",
    data() {
        return {
            store,
            isLoading: false
        }
    },
    methods: {
        // Funzione per avere il menu del ristorante selezionato
        fetchDishes() {
            this.isLoading = true;

            axios.get(`http://127.0.0.1:8000/api/menu/${this.$route.params.id}`)
                .then((response) => {
                    this.store.dishes = response.data.results;
                    this.isLoading = false;
                    this.store.dishes.dishes.forEach((dish) => {
                        dish.quantity = 1;
                    });
                    console.log(this.store.dishes)
                });
        },
        // Funzione per aggiungere un piatto al carrello
        addToCart(dish) {
            const newItem = {
                itemID: dish.id,
                itemImage: dish.image,
                itemName: dish.name,
                itemPrice: dish.price,
                itemQuantity: dish.quantity,
                itemRestaurantId: dish.restaurant_id,
                itemTotalPrice: parseFloat((dish.price * dish.quantity).toFixed(2)),
            };

            if (this.store.checkRestaurant == null) {
                this.store.checkRestaurant = newItem.itemRestaurantId;
            }


            if (this.store.checkRestaurant == newItem.itemRestaurantId) {
                this.store.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                this.store.cart.push(newItem);
                sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
            } else {
                this.store.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                this.store.cart = '';
                sessionStorage.setItem('cart', JSON.stringify(this.store.cart));

                this.store.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
                this.store.cart.push(newItem);
                this.store.checkRestaurant = newItem.itemRestaurantId;
                sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
            }
        },
        checkEmptyCart() {
            if (!this.store.cart || this.store.cart.length === 0) {
                this.store.checkRestaurant = null;
                return;
            }
        },

        // Funzione per aumentare la quantita dell'oggetto
        increaseQuantity(dish) {
            dish.quantity += 1;
        },
        // Funzione per diminuire la quantita dell'oggetto
        decreaseQuantity(dish) {
            dish.quantity -= 1;
            if (dish.quantity < 1) {
                dish.quantity = 1;
            }
        },
        // Funzione per aggiungere la quantita ad un elemento gia presente nel carrello se esiste
        checkIfExists(dish, store) {
            let isExisting = false;
            if (store.length > 0) {

                for (let i = 0; i < store.length; i++) {
                    if (store[i].itemID === dish.id) {
                        store[i].itemQuantity += dish.quantity;
                        store[i].itemTotalPrice += parseFloat((dish.price * dish.quantity).toFixed(2));
                        isExisting = true;
                        break; // Esci dal ciclo una volta trovato l'elemento corrispondente
                    }
                }

                if (!isExisting) {
                    this.addToCart(dish);
                }
            } else {
                this.addToCart(dish);
            }
        }
    },
    created() {
        this.fetchDishes();
    },
    computed() {
        this.checkEmptyCart();
    }
}
</script>

<template>
    <!-- Menu -->
    <section id="menu">
        <div class="container">

            <!-- Pulsante per tornare alla lista dei ristoranti -->
            <div class="ms_back py-3">
                <router-link :to="{ name: 'ristoranti' }" type="button" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-left-long me-3"></i>
                    Torna alla lista dei ristoranti
                </router-link>
            </div>

            <!-- Dettagli ristorante selezionato -->
            <div class="ms_restaurant-detail container-fluid rounded-4 p-3">
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <!-- Immagine del ristorante selezionato -->
                        <img class="img-fluid rounded-4"
                            :src="`${this.store.baseUrl}/storage/${this.store.dishes.restaurant.image}`"
                            alt="immagine Ristorante">
                    </div>
                    <div class="col-12 col-lg-6 text-start">
                        <!-- Nome del ristorante selezionato -->
                        <h1 class="pt-2">{{ this.store.dishes.restaurant.name }}</h1>
                        <!-- Indirizzo e numero di telefono del ristorante selezionato -->
                        <div class="d-flex justify-content-around py-3 fst-italic">
                            <small>{{ this.store.dishes.restaurant.address }}</small>
                            <small>{{ this.store.dishes.restaurant.phone }}</small>
                        </div>
                        <!-- Descrizione del ristorante selezionato -->
                        <p class="text-white">
                            {{ this.store.dishes.restaurant.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Titolo Sezione -->
            <div class="ms_menu-title py-4 text-center">
                <h1>Sfoglia il menu</h1>
            </div>

            <div class="ms_menu row justify-content-center">

                <!-- Loader -->
                <div v-if="isLoading" class="driver-loader d-flex justify-content-center align-items-center py-5">
                    <img src="../../public/logo.gif" alt="Loading" />
                </div>

                <!-- Singolo piatto del ristorante -->
                <div v-if="this.store.dishes.dishes.length > 0" v-for="(dish, index) in this.store.dishes.dishes"
                    :key="index" class="col-12 col-md-6 col-lg-4 col-xxl-3 py-3 px-4 my-2 text-center">
                    <div class="ms_inner-menu rounded-5 py-4 px-3">
                        <!-- Se il piatto non è disponibile -->
                        <div v-show="!dish.available" class="ms_available rounded-5">
                            NON DISPONIBILE
                        </div>
                        <!-- Immagine del piatto -->
                        <img v-if="dish.image" class="rounded-5" :src="`${this.store.baseUrl}/storage/${dish.image}`"
                            alt="Immagine piatto" />
                        <!-- Immagine di riserva in caso di mancanza -->
                        <img v-else src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                            alt="no image">
                        <!-- Nome del piatto -->
                        <h2 class="d-flex justify-content-center align-items-center">{{ dish.name }}</h2>
                        <!-- Descrizione del piatto -->
                        <p class="pb-2">{{ dish.description }}</p>
                        <!-- Pulsantiera -->
                        <div>
                            <!-- Pulsante per settare la quantità -->
                            <div
                                class="ms_quantity w-100 rounded-pill fw-semibold mb-2 d-flex justify-content-between align-items-center">
                                <!-- Pulsante meno -->
                                <button id="quantity-decrease" class="btn rounded-circle" @click="decreaseQuantity(dish)">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <!-- Contatore -->
                                <span>{{ dish.quantity }}</span>
                                <!-- <input type="number" min="0" max="15" v-model="dish.quantity" readonly> -->
                                <!-- Pulsante piu -->
                                <button id="quantity-increase" class="btn rounded-circle" @click="increaseQuantity(dish)">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <!-- Pulsante per aggiungere l'elemento al carrello -->
                            <button id="add-to-cart" class="btn w-100 rounded-pill fw-semibold"
                                @click="checkIfExists(dish, store.cart)">
                                Aggiungi per €{{ (dish.price * dish.quantity).toFixed(2).replace(".", ",") }}
                            </button>
                        </div>
                    </div>
                </div>

                <div v-else class="d-flex justify-content-center align-items-center text-center py-5">
                    <h3 class="text-white fst-italic">Non è possibile ordinare da questo ristorante, menu in aggiornamento!
                    </h3>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";
@import "../styles/partials/mixins";

#menu {
    @include bg-image;

    & .ms_menu-title h1 {
        font-size: 36px;
        color: $primary-color;
    }

    & .ms_back {

        & a {
            width: 250px;
            background-color: $secondary-color;
            color: $primary-color;
            border-color: $primary-color;
        }
    }

    & .ms_restaurant-detail {
        background-color: rgba($color-black, 0.8);
        border: 3px solid $primary-color;

        & h1 {
            color: $primary-color;
        }

        & p {
            height: 100px;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        & small {
            color: $primary-alternative-color;
        }
    }

    & .ms_menu {

        & .ms_inner-menu {
            position: relative;
            background-color: $secondary-color;
            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

            & .ms_available {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba($color: #000000, $alpha: 0.4);
                z-index: 1005;
                display: flex;
                justify-content: center;
                align-items: center;
                color: $color-white;
                font-size: 40px;
                font-weight: bolder;
                text-shadow: 1px 1px 2px $primary-color;
            }

            & img {
                width: 160px;
                height: 140px;
                aspect-ratio: auto;
                margin: -60px 0 1rem 0;
            }

            & h2 {
                color: $color-white;
                font-size: 24px;
                min-height: 60px;
                max-height: 60px;
            }

            & p {
                color: $color-white;
                min-height: 100px;
                max-height: 100px;
                overflow: hidden;
            }

            & div {

                & .ms_quantity {
                    border: 2px solid $primary-color;
                    background-color: $primary-color;
                    color: $secondary-color;
                }

                & #add-to-cart {
                    border: 2px solid $primary-color;
                    background-color: $primary-color;
                    color: $secondary-color;
                }
            }
        }
    }
}

/* Interazioni */
#menu .ms_inner-menu:hover {
    background-color: $primary-color;
    transition: 1s all ease;
}

#menu .ms_inner-menu:hover div .ms_quantity button {
    cursor: pointer;
}

#menu .ms_inner-menu:hover div .ms_quantity {
    border: 2px solid $secondary-color;
}

#menu .ms_inner-menu:hover div #add-to-cart {
    border: 2px solid $secondary-color;
}

/* MEDIA QUERY */
@media(min-width:1200px) {
    #menu .ms_restaurant-detail p {
        height: 150px;
    }
}

@media(min-width:1400px) {
    #menu .ms_restaurant-detail p {
        height: 210px;
    }
}
</style>