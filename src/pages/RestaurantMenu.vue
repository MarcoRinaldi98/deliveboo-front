<script>
export default {
    name: "RestaurantMenu"
}
</script>

<template>
    <section class="our-menu">
        <div class="container">
            <div class="our-menu-title">
                <h1>Sfoglia il menu</h1>
            </div>

            <div class="row">

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_2.png" alt="">
                        <h2>Pollo Arrosto</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_3.png" alt="">
                        <h2>Pizza Capricciosa</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_2.png" alt="">
                        <h2>Pollo in Agrodolce</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_3.png" alt="">
                        <h2>Pizza Diavola</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_4.png" alt="">
                        <h2>Tagliata di Manzo</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_5.png" alt="">
                        <h2>Spaghetti di mare</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_4.png" alt="">
                        <h2>Bistecca</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>

                <div class="inner-menu-con col-3">
                    <div class="inner-menu-content">
                        <img src="menu_1_5.png" alt="">
                        <h2>Insalata di Mare</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae veritatis magni, harum odio
                            delectus, quae explicabo evenie</p>
                        <a href="#">
                            <i class='bx bx-plus'></i>
                            Aggiungi al carrello
                        </a>
                    </div>
                </div>
            </div>

            <div class="pages">
                <nav>
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">&laquo; Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next &raquo;</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.our-menu {
    padding-top: 120px;
    background-image: url(back1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.our-menu-title h1 {
    font-size: 40px;
    padding: 1rem 0;
    text-align: center;
    color: #f3a446;
}

.inner-menu-con {
    padding: 1rem 2rem;
    text-align: center;
    margin: 1rem 0;
}

.inner-menu-content {
    background-color: #1d1d1d82;
    padding: 2rem 1rem;
    border-radius: 20px;
    position: relative;
    z-index: 999;
    transition: 1s all;
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}

.inner-menu-content::before {
    content: '';
    position: absolute;
    background-color: #f3a446;
    bottom: 0;
    height: 0;
    width: 50%;
    left: 25%;
    z-index: -1;
    border-radius: 20px;
    transition: 1s all ease;
}

.inner-menu-content:hover:before {
    height: 100%;
    width: 100%;
    left: 0;
}

.inner-menu-content img {
    width: 150px;
    margin-top: -60px;
}

.inner-menu-content h2 {
    color: white;
    font-size: 28px;
}

.inner-menu-content p {
    padding: 1rem 0 2rem 0;
    color: white;
}

.inner-menu-content a {
    margin-bottom: 15px;
    padding: 1rem 1.5rem;
    background: #1d1d1d;
    color: white;
    text-decoration: none;
}

.inner-menu-content a:hover {
    background-color: #a06235;
}

.pages {
    display: flex;
    justify-content: center;
}

.pages .pagination .page-item a {
    background-color: #1d1d1d;
    color: #a06235;
    margin: 1rem auto;
}

.pages .pagination .page-item:hover a {
    color: #f3a446;
}
</style>