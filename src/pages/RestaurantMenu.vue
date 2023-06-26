<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: "RestaurantMenu",
    data() {
        return {
            store,
            isLoading: false,
            dishCounter: 1
        }
    },
    methods: {
        async fetchDishes() {
            this.isLoading = true;

            axios.get(`http://127.0.0.1:8000/api/dish/${this.$route.params.id}`)
                .then((response) => {
                    console.log(response);
                    this.store.dishes = response.data.results;
                    this.isLoading = false;
                });
        },
        addToCart(dish) {
            const newItem = {
                itemID: dish.id,
                itemImage: dish.image,
                itemName: dish.name,
                itemPrice: dish.price,
                itemQuantity: this.dishCounter,
                itemTotalPrice: parseFloat((dish.price * this.dishCounter).toFixed(2)),
            };

            this.store.cart.push(newItem);

            // LocalStorage
            this.store.cart = JSON.parse(sessionStorage.getItem('cart')) || [];
            this.store.cart.push(newItem);
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart));
            console.log(sessionStorage.getItem('cart'))
        },
        increaseDishCounter() {
            this.dishCounter += 1;
        },

        decreaseDishCounter() {
            this.dishCounter -= 1;
            if (this.dishCounter <= 1) {
                this.dishCounter = 1;
            }
        }
    },
    created() {
        this.fetchDishes();
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
                        <img class="img-fluid rounded-4" src="../../public/mc.jpg" alt="immagine ristorante">
                    </div>
                    <div class="col-12 col-lg-6 text-start">
                        <!-- Nome del ristorante selezionato -->
                        <h1 class="pt-2">Nome ristorante</h1>
                        <!-- Indirizzo e numero di telefono del ristorante selezionato -->
                        <div class="d-flex justify-content-around py-3 fst-italic">
                            <small>indirizzo</small>
                            <small>numero di telefono</small>
                        </div>
                        <!-- Descrizione del ristorante selezionato -->
                        <p class="text-white">
                            Descrizione: Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                            debitis iusto
                            distinctio mollitia asperiores atque accusamus! Facere enim doloremque adipisci quidem fugit
                            harum, eveniet velit quas placeat voluptatem eius! Quibusdam.
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
                <div v-for="(dish, index) in this.store.dishes" :key="index"
                    class="col-12 col-md-6 col-lg-4 col-xxl-3 py-3 px-4 my-2 text-center">
                    <div class="ms_inner-menu rounded-5 py-4 px-3">
                        <!-- Immagine del piatto -->
                        <img v-if="dish.image" :src="`${this.store.baseUrl}/storage/${dish.image}`" alt="Immagine piatto" />
                        <!-- Immagine di riserva in caso di mancanza -->
                        <img v-else src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                            alt="no image">
                        <!-- Nome del piatto -->
                        <h2 class="d-flex justify-content-center align-items-center">{{ dish.name }}</h2>
                        <!-- Descrizione del piatto -->
                        <p class="pb-2">{{ dish.description }} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel
                            quasi cumque, eaque consequuntur quas, atque aspernatur molestiae quae corporis, magnam labore
                            nulla minima cupiditate nobis voluptate dicta saepe cum consectetur.</p>
                        <!-- Pulsantiera -->
                        <div>
                            <!-- Pulsante per settare la quantità -->
                            <div
                                class="ms_quantity w-100 rounded-pill fw-semibold mb-2 d-flex justify-content-between align-items-center">
                                <!-- Pulsante meno -->
                                <button id="quantity-decrease" class="btn rounded-circle" @click="decreaseDishCounter()">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                <!-- Contatore -->
                                <span>{{ dishCounter }}</span>
                                <!-- Pulsante piu -->
                                <button id="quantity-increase" class="btn rounded-circle" @click="increaseDishCounter()">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                            </div>
                            <!-- Pulsante per aggiungere l'elemento al carrello -->
                            <button id="add-to-cart" class="btn w-100 rounded-pill fw-semibold" @click="addToCart(dish)">
                                Aggiungi per €{{ (dish.price * dishCounter).toFixed(2).replace(".", ",") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Paginazione -->
            <div class="ms_pages d-flex justify-content-center">
                <nav>
                    <ul class="pagination">
                        <!-- Indietro -->
                        <li class="page-item"><a class="page-link" href="#">&laquo; Previous</a></li>
                        <!-- Pulsanti pagina diretta -->
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <!-- Avanti -->
                        <li class="page-item"><a class="page-link" href="#">Next &raquo;</a></li>
                    </ul>
                </nav>
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
            background-color: $secondary-color;
            box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

            & img {
                width: 150px;
                aspect-ratio: 4 / 3;
                margin: -60px 0 1rem 0;
            }

            & h2 {
                color: $color-white;
                font-size: 24px;
                height: 60px;
            }

            & p {
                color: $color-white;
                height: 100px;
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

    & .ms_pages {

        & .pagination .page-item a {
            background-color: $secondary-color;
            color: $primary-alternative-color;
            margin: 1rem auto;
            border-color: $primary-alternative-color;
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