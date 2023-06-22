<script>
export default {
    name: "RestaurantList"
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

            <div class="row justify-content-center">
                <!-- Ristorante -->
                <div class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img src="pokehouse.jpeg" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>Poke House</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <router-link :to="{ name: 'menu' }" href="/menu">
                            Visualizza Menù
                        </router-link>
                    </div>
                </div>
                <!-- Ristorante -->
                <div class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img src="kfc.jpg" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>KFC</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <router-link :to="{ name: 'menu' }" href="/menu">
                            Visualizza Menù
                        </router-link>
                    </div>
                </div>
                <!-- Ristorante -->
                <div class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img src="mc.jpg" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>Mc Donalds</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <router-link :to="{ name: 'menu' }" href="/menu">
                            Visualizza Menù
                        </router-link>
                    </div>
                </div>
                <!-- Ristorante -->
                <div class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img src="kebhouse.jpeg" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>Kebhouze</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <router-link :to="{ name: 'menu' }" href="/menu">
                            Visualizza Menù
                        </router-link>
                    </div>
                </div>
                <!-- Ristorante -->
                <div class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img src="tacos.jpg" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>Billy Tacos</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <router-link :to="{ name: 'menu' }" href="/menu">
                            Visualizza Menù
                        </router-link>
                    </div>
                </div>
                <!-- Ristorante -->
                <div class="ms_restaurant col-12 col-md-6 col-lg-4">
                    <div class="restaurant-content">
                        <img src="burgerking.jpg" alt="Immagine Ristorante" />
                    </div>
                    <div class="restaurant-content">
                        <h3>Burger King</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <router-link :to="{ name: 'menu' }" href="/menu">
                            Visualizza Menù
                        </router-link>
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
                    padding-bottom: 2rem;
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

        & .pagination .page-item a {
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

#restaurants .ms_pages .pagination .page-item a:hover {
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