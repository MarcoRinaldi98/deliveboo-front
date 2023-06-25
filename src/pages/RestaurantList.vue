<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
    name: "RestaurantList",
    data() {
        return {
            store,
            restaurants: [],
            types: [],
            currentType: '',
            isLoading: false,
            currentPage: 1,
            lastPage: null
        }
    },
    methods: {
        async fetchRestaurants() {
            this.isLoading = true;
            let url = '';

            if (this.currentType == '') {
                url = `${this.store.baseUrl}/api/restaurants`;
                await axios.get(url)
                    .then((response) => {
                        console.log(response);
                        this.restaurants = response.data.results.data;
                        this.isLoading = false;
                    });
            } else {
                url = `${this.store.baseUrl}/api/restaurants/type/${this.currentType}`;

                await axios.get(url)
                    .then((response) => {
                        console.log(response);
                        this.restaurants = response.data.data;
                        this.isLoading = false;
                    });
            }
            this.isLoading = false;
        },
        fetchTypes() {
            this.isLoading = true;

            axios.get(`${this.store.baseUrl}/api/types`)
                .then((response) => {
                    this.types = response.data.results;
                    this.isLoading = false;
                });
        }
    },
    created() {
        this.fetchRestaurants();
        this.fetchTypes();
    }
}
</script>

<template>
    <!-- Ristoranti -->
    <section id="restaurants">
        <div class="container">
            <!-- Titolo Sezione -->
            <div class="ms_title">
                <h1>I nostri ristoranti</h1>
            </div>

            <div class="ms_filter">
                <select class="form-select" v-model="currentType" @change="fetchRestaurants()">
                    <option value="" selected> Tutti </option>
                    <option v-for="typology in types" :value="typology.id"> {{ typology.name }} </option>
                </select>
            </div>

            <div class="row justify-content-center">

                <!-- Loader -->
                <div v-if="isLoading" class="driver-loader d-flex justify-content-center align-items-center py-5">
                    <img src="logo.gif" alt="Loading" />
                </div>

                <!-- Ristorante -->
                <div v-if="restaurants.length > 0" v-for="restaurant in restaurants"
                    class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img :src="`${this.store.baseUrl}/storage/${restaurant.image}`" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>{{ restaurant.name }}</h3>
                        <p>{{ restaurant.description }}</p>
                        <router-link :to="{ name: 'menu', params: { id: restaurant.id } }">
                            Visualizza Menù
                        </router-link>
                    </div>
                </div>

                <div v-else class="d-flex justify-content-center align-items-center py-5">
                    <h3 class="text-white fst-italic">Nessun ristorante per il tipo selezionato</h3>
                </div>

            </div>

            <!-- Paginazione -->
            <div class="ms_pages">
                <nav>
                    <ul class="pagination">
                        <!-- Indietro -->
                        <li class="page-item">
                            <button class="page-link" :class="{ 'disabled': currentPage == 1 }">
                                &laquo; Previous
                            </button>
                        </li>
                        <!-- Pulsanti pagina diretta -->
                        <li class="page-item" v-for="(page, index) in this.lastPage">
                            <button class="page-link" :class="{ 'active': currentPage == index + 1 }">
                                1
                            </button>
                        </li>
                        <!-- Avanti -->
                        <li class="page-item">
                            <button class="page-link" :class="{ 'disabled': currentPage == lastPage }">
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";

#restaurants {
    padding: 2rem 0;
    background-image: url(back1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    & .ms_title {
        text-align: center;

        & h1 {
            font-size: 40px;
            color: $primary-color;
        }
    }

    & .ms_filter {
        width: 250px;

        & select {
            background-color: $secondary-color;
            color: $primary-color;
            border-color: $primary-color;
        }
    }

    & .row {

        & .ms_restaurant {
            background-color: $secondary-color;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
            margin: 1rem 10px;
            padding: 2rem;
            transition: 1s all ease;
            border-radius: 15px;
            text-align: center;

            & .restaurant-content {

                & img {
                    width: 250px;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 64px 12px 64px 12px;
                    transition: 1.3s all;
                }

                & h3 {
                    color: $primary-alternative-color;
                    font-size: 28px;
                    padding-top: 1rem;
                }

                & p {
                    color: $color-white;
                    padding: 1rem 0;
                    margin-bottom: 2rem;
                    height: 140px;
                    overflow: hidden;
                }

                & a {
                    padding: 0.5rem 2rem;
                    color: $color-white;
                    text-decoration: none;
                    background-color: $primary-color;
                }
            }
        }
    }

    & .ms_pages {
        display: flex;
        justify-content: center;

        & .pagination .page-item button {
            background-color: $secondary-color;
            color: $primary-alternative-color;
            margin: 1rem auto;
            border-color: $primary-alternative-color;
        }
    }
}

/* Interazioni */
#restaurants .ms_restaurant:hover {
    background: $primary-color;
}

#restaurants .ms_restaurant:hover .restaurant-content img {
    transform: scale(1.2);
}

#restaurants .ms_restaurant .restaurant-content a:hover {
    background-color: $secondary-color;
}

#restaurants .ms_pages .pagination .page-item button:hover {
    background-color: $primary-alternative-color;
    color: $secondary-color;
}

/* MEDIA QUERY */
@media(min-width:768px) {
    #restaurants .ms_restaurant {
        width: calc(100% / 2 - 20px);
    }
}

@media(min-width:992px) {
    #restaurants .ms_restaurant {
        width: calc(100% / 3 - 20px);
    }
}
</style>