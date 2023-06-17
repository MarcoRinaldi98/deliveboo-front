<script>
export default {
    name: "AppHome"
}
</script>

<template>
    <!-- Home -->
    <section id="jumbotron">

        <div class="container-fluid">
            <div class="ms_main-home-section row">
                <!-- Left Content -->
                <div class="col-12 col-md-6">
                    <div class="ms_left-content">
                        <h1>Deliveboo</h1>
                        <p>In pochi minuti il piatto che desiteri a casa tua!</p>

                        <a href="#">Sfoglia i nostri ristoranti</a>
                    </div>
                </div>
                <!-- Right Content -->
                <div class="col-12 col-md-6">
                    <div class="ms_right-image">
                        <img src="Tomato Sauce.png" alt="immagine piatto di presentazione" />
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
#jumbotron {
    padding-top: 100px;
    background-image: url(back1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    & .ms_main-home-section {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-wrap: wrap;
        padding: 0 5rem;

        & .ms_left-content {
            text-align: center;

            & h1 {
                color: #a06235;
                font-size: 60px;
                line-height: 2.5rem;
            }

            & p {
                color: #f3a446;
                font-size: 1.5rem;
                padding: 1rem 0;
            }

            & a {
                text-decoration: none;
                color: #1d1d1d;
                font-weight: 600;
                padding: 1rem 3rem;
                background-color: #f3a446;
                transition: 0.6s all ease;
            }
        }

        & .ms_right-image {
            width: 100%;
            margin-top: 100px;

            & img {
                width: 100%;
                text-align: right;
            }
        }
    }
}

/* Interazioni */
#jumbotron .ms_main-home-section .ms_left-content a:hover {
    color: white;
    border-radius: 15px;
}

/* MEDIA QUERY */
@media(min-width:768px) {
    #jumbotron .ms_main-home-section .ms_left-content {
        text-align: left;
    }
}
</style>