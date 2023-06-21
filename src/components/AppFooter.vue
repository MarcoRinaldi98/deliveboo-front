<script>
export default {
    name: "AppFooter"
}
</script>

<template>
    <footer>
        <!-- Footer Top Section -->
        <section class="ms_footer-top">
            <div class="container-md">
                <div class="row">
                    <div class="col-6 col-md-4 ms_inner-footer">
                        <ul>
                            <li>
                                <h2>Scopri Deliveboo</h2>
                            </li>
                            <li>
                                <a href="#">Investitori</a>
                            </li>
                            <li>
                                <a href="#">Chi Siamo</a>
                            </li>
                            <li>
                                <a href="#">Ristoranti</a>
                            </li>
                            <li>
                                <a href="#">Altro</a>
                            </li>
                            <li>
                                <a href="#">Lavora con noi</a>
                            </li>
                            <li>
                                <a href="#">Diventa nostro partner</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-6 col-md-8 container">
                        <div class="row">
                            <div class="col-12 col-md-6 ms_inner-footer">
                                <ul>
                                    <li>
                                        <h2>Note legali</h2>
                                    </li>
                                    <li>
                                        <a href="#">Termini & Condizioni</a>
                                    </li>
                                    <li>
                                        <a href="#">Informativa sulla privacy</a>
                                    </li>
                                    <li>
                                        <a href="#">Cookies</a>
                                    </li>
                                </ul>
                            </div>

                            <div class="col-12 col-md-6 ms_inner-footer">
                                <ul>
                                    <li>
                                        <h2>Aiuto</h2>
                                    </li>
                                    <li>
                                        <a href="#">Contatti</a>
                                    </li>
                                    <li>
                                        <a href="#">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="#">Tipi di cucina</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Footer Bottom Section -->
        <section class="ms_footer-bottom d-flex align-items-center flex-column">
            <!-- Social Icon -->
            <div class="ms_social">
                <a href="#"><i class='bx bxl-facebook'></i></a>
                <a href="#"><i class='bx bxl-instagram'></i></a>
                <a href="#"><i class='bx bxl-twitter'></i></a>
                <a href="#"><i class='bx bxl-youtube'></i></a>
            </div>
            <!-- Utility Links -->
            <div class="ms_links">
                <a href="#">Privacy Policy</a>
                <a href="#">Our Company</a>
                <a href="#">Term Of Use</a>
            </div>
            <!-- Copyright -->
            <p>&#169; {{ new Date().getFullYear() }} Copyright Deliveboo</p>
        </section>
    </footer>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";

footer {

    & .ms_footer-top {
        background-image: url(BG.png);
        padding: 2rem 0;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        & .ms_inner-footer {
            padding: 1rem;

            & ul {
                list-style: none;

                & li {
                    padding: 0.5rem 0;
                    display: block;

                    h2 {
                        color: $primary-alternative-color;
                        font-size: 18px;
                        padding: 0.2rem 0;
                    }

                    a {
                        color: $color-white;
                        align-items: center;
                        font-size: 12px;
                        transition: 0.5s;
                        text-decoration: none;
                    }
                }
            }
        }
    }

    & .ms_footer-bottom {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        & .ms_social a {
            font-size: 30px;
            margin: 0.5rem;

            & .bx {
                padding: 5px;
                color: $color-white;
                background: $secondary-color;
                border-radius: 50%;
            }
        }

        & .ms_links {
            margin: 1rem 0;

            & a {
                text-decoration: none;
                font-weight: 500;
                color: $primary-alternative-color;
                font-size: 12px;
                padding: 1rem;
            }
        }

        & p {
            text-align: center;
            font-style: italic;
            font-size: 14px;
        }
    }
}

/* Interazioni */
.ms_inner-footer ul li a:hover {
    margin-left: 10px;
}

/* Hover social icon */
//Facebook
.ms_social a:nth-child(1) .bx:hover {
    background: #1773ea;
}

//Instagram
.ms_social a:nth-child(2) .bx:hover {
    background: #f09433;
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
}

//Twitter
.ms_social a:nth-child(3) .bx:hover {
    background: #1c9cea;
}

//Youtube
.ms_social a:nth-child(4) .bx:hover {
    background: #f70000;
}

.ms_footer-bottom .ms_links a:hover {
    color: #f3a446;
}

/* MEDIA QUERY */
@media(min-width:576px) {
    footer .ms_footer-bottom .ms_links a {
        font-size: 1rem;
    }
}

@media(min-width:768px) {
    footer .ms_footer-top .ms_inner-footer ul li h2 {
        font-size: 24px;
    }

    footer .ms_footer-top .ms_inner-footer ul li a {
        font-size: 16px;
    }
}
</style>