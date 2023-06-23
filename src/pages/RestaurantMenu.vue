<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: "RestaurantMenu",
    data() {
        return {
            store,
            dishes: [],
            isLoading: false
        }
    },
    methods: {
        async fetchDishes() {
            this.isLoading = true;

            axios.get(`http://127.0.0.1:8000/api/dish/${this.$route.params.id}`)
                .then((response) => {
                    console.log(response);
                    this.dishes = response.data.results;
                    this.isLoading = false;
                });
        }
    },
    created() {
        this.fetchDishes();
    }
}
</script>

<template>
    <!-- Menu -->
    <section id="our-menu">
        <div class="container">
            <!-- Titolo Sezione -->
            <div class="our-menu-title">
                <h1>Sfoglia il menu</h1>
            </div>

            <!-- Pulsante per tornare alla lista dei ristoranti -->
            <div class="ms_back">
                <router-link :to="{ name: 'ristoranti' }" type="button" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-left-long me-3"></i>
                    Torna alla lista dei ristoranti
                </router-link>
            </div>

            <div class="row justify-content-center">

                <!-- Loader -->
                <div v-if="isLoading" class="driver-loader d-flex justify-content-center align-items-center py-5">
                    <img src="logo.gif" alt="Loading" />
                </div>

                <!-- Piatto del ristorante -->
                <div v-for="dish in dishes" class="inner-menu-con col-12 col-md-6 col-lg-4 col-xxl-3">
                    <div class="inner-menu-content">
                        <img v-if="dish.image" :src="`${this.store.baseUrl}/storage/${dish.image}`" alt="Immagine piatto" />
                        <img v-else src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                            alt="no image">
                        <h2>{{ dish.name }}</h2>
                        <p>{{ dish.description }}</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>
            </div>

            <!-- Paginazione -->
            <div class="ms_pages">
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

#our-menu {
    background-image: url(back1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    & .our-menu-title h1 {
        font-size: 40px;
        padding: 2rem;
        text-align: center;
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

    & .row {

        & .inner-menu-con {
            padding: 1rem 2rem;
            text-align: center;
            margin: 1rem 0;
            display: flex;

            & .inner-menu-content {
                background-color: $secondary-color;
                padding: 2rem 1rem;
                border-radius: 20px;
                position: relative;
                z-index: 999;
                transition: 1s all;
                align-self: stretch;
                box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

                & img {
                    width: 150px;
                    margin-top: -60px;
                }

                & h2 {
                    color: $color-white;
                    font-size: 28px;
                }

                & p {
                    padding: 1rem 0 2rem 0;
                    color: $color-white;
                }

                & a {
                    margin-bottom: 15px;
                    padding: 1rem 1.5rem;
                    background: $secondary-color;
                    color: $color-white;
                    text-decoration: none;
                    align-items: end;
                }
            }
        }
    }

    & .ms_pages {
        display: flex;
        justify-content: center;

        & .pagination .page-item a {
            background-color: $secondary-color;
            color: $primary-alternative-color;
            margin: 1rem auto;
            border-color: $primary-alternative-color;
        }
    }
}

/* Interazioni */
#our-menu .inner-menu-content::before {
    content: '';
    position: absolute;
    background-color: $primary-color;
    bottom: 0;
    height: 0;
    width: 50%;
    left: 25%;
    z-index: -1;
    border-radius: 20px;
    transition: 1s all ease;
}

#our-menu .inner-menu-content:hover:before {
    height: 100%;
    width: 100%;
    left: 0;
}

#our-menu .inner-menu-content a:hover {
    background-color: $primary-alternative-color;
}

#our-menu .ms_pages .pagination .page-item a:hover {
    background-color: $primary-alternative-color;
    color: $secondary-color;
}
</style>