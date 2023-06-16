<script>
export default {
    name: "AppFooter"
}
</script>

<template>
    <footer>
        <section class="footer-top">
            <div class="container">
                <div class="row">
                    <div class="col-4 inner-footer">
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

                    <div class="col-4 inner-footer">
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

                    <div class="col-4 inner-footer">
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
        </section>

        <section class="footer-bottom">
            <div class="social">
                <a href="#"><i class='bx bxl-facebook'></i></a>
                <a href="#"><i class='bx bxl-instagram'></i></a>
                <a href="#"><i class='bx bxl-twitter'></i></a>
                <a href="#"><i class='bx bxl-youtube'></i></a>
            </div>
            <div class="links">
                <a href="#">Privacy Policy</a>
                <a href="#">Our Company</a>
                <a href="#">Term Of Use</a>
            </div>
            <p>&#169; 2023 Copyright Deliveboo</p>
        </section>
    </footer>
</template>

<style lang="scss" scoped>
.footer-top {
    background-image: url(BG.png);
    padding: 2rem 7%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.inner-footer {
    padding: 3rem;
}

.inner-footer ul {
    list-style: none;
}

.inner-footer ul li {
    padding: 1rem 0;
    display: block;
}

.inner-footer ul li h2 {
    color: #a06235;
    font-size: 24px;
    padding: 1rem 0;
}

.inner-footer ul li a {
    color: white;
    align-items: center;
    font-size: 16px;
    transition: 0.5s;
    text-decoration: none;
}

.inner-footer ul li a:hover {
    margin-left: 10px;
}

.footer-bottom {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.social a {
    font-size: 30px;
    margin: 0.5rem;
}

.social a .bx {
    padding: 5px;
    color: #fff;
    background: #161616;
    border-radius: 50%;
}

.social a:nth-child(1) .bx:hover {
    background: #1773ea;
}

.social a:nth-child(2) .bx:hover {
    background: #f09433;
    background: -moz-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: -webkit-linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
}

.social a:nth-child(3) .bx:hover {
    background: #1c9cea;
}

.social a:nth-child(4) .bx:hover {
    background: #f70000;
}

.links {
    margin: 1rem 0;
}

.links a {
    text-decoration: none;
    font-weight: 500;
    color: #a06235;
    padding: 1rem;
}

.links a:hover {
    color: #f3a446;
}

.footer-bottom p {
    text-align: center;
    font-style: italic;
    font-size: 14px;
}
</style>