<script>
export default {
    name: "AppHome"
}
</script>

<template>
    <!-- Home -->
    <section id="jumbotron">

        <div class="container-fluid">
            <div class="ms_main-home-section h-100 d-flex justify-content-center align-items-center row">
                <!-- Left Content -->
                <div class="col-12 col-md-6">
                    <div class="ms_left-content">
                        <h1>Deliveboo</h1>
                        <p>In pochi minuti il piatto che desiteri a casa tua!</p>

                        <a href="/ristoranti">Sfoglia i nostri ristoranti</a>
                    </div>
                </div>
                <!-- Right Content -->
                <div class="col-12 col-md-6">
                    <div class="ms_right-image w-100">
                        <img class="w-100" src="Tomato Sauce.png" alt="immagine piatto di presentazione" />
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";

#jumbotron {
    background-image: url(back1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    & .ms_main-home-section {

        & .ms_left-content {
            text-align: center;
            padding-top: 2rem;

            & h1 {
                color: $primary-alternative-color;
                font-size: 60px;
                line-height: 2.5rem;
            }

            & p {
                color: $primary-color;
                font-size: 1.5rem;
                padding: 1rem 0;
            }

            & a {
                text-decoration: none;
                color: $secondary-color;
                font-weight: 600;
                padding: 1rem 3rem;
                background-color: $primary-color;
                transition: 0.6s all ease;
            }
        }

        & .ms_right-image {
            margin-top: 80px;

            & img {
                width: 100%;
                text-align: right;
            }
        }
    }
}

/* Interazioni */
#jumbotron .ms_main-home-section .ms_left-content a:hover {
    color: $color-white;
    border-radius: 15px;
}

/* MEDIA QUERY */
@media(min-width:768px) {
    #jumbotron .ms_main-home-section {
        padding: 0 5rem;

        & .ms_left-content {
            text-align: left;
            padding: 0;
        }
    }
}
</style>