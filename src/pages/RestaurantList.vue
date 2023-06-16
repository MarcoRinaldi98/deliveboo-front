<script>
export default {
    name: "RestaurantList"
}
</script>

<template>
    <section class="main-favourite">
        <div class="container">
            <div class="main-header-title">
                <h1>I nostri ristoranti</h1>
            </div>

            <div class="row">
                <div class="inner-favourite col-4">
                    <div class="fav-content">
                        <img src="pokehouse.jpeg" alt="">
                    </div>
                    <div class="fav-content">
                        <h3>Poke House</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <a href="">Visualizza Menù</a>
                    </div>
                </div>

                <div class="inner-favourite col-4">
                    <div class="fav-content">
                        <img src="kfc.jpg" alt="">
                    </div>
                    <div class="fav-content">
                        <h3>KFC</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <a href="">Visualizza Menù</a>
                    </div>
                </div>

                <div class="inner-favourite col-4">
                    <div class="fav-content">
                        <img src="mc.jpg" alt="">
                    </div>
                    <div class="fav-content">
                        <h3>Mc Donalds</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <a href="">Visualizza Menù</a>
                    </div>
                </div>

                <div class="inner-favourite col-4">
                    <div class="fav-content">
                        <img src="kebhouse.jpeg" alt="">
                    </div>
                    <div class="fav-content">
                        <h3>Kebhouze</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <a href="">Visualizza Menù</a>
                    </div>
                </div>

                <div class="inner-favourite col-4">
                    <div class="fav-content">
                        <img src="tacos.jpg" alt="">
                    </div>
                    <div class="fav-content">
                        <h3>Billy Tacos</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <a href="">Visualizza Menù</a>
                    </div>
                </div>

                <div class="inner-favourite col-4">
                    <div class="fav-content">
                        <img src="burgerking.jpg" alt="">
                    </div>
                    <div class="fav-content">
                        <h3>Burger King</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis deleniti vel fuga voluptate
                            perspiciatis?</p>
                        <a href="">Visualizza Menù</a>
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
.main-favourite {
    padding-top: 120px;
    background-image: url(back1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.main-header-title h1 {
    text-align: center;
    font-size: 40px;
    color: #f3a446;
}

.inner-favourite {
    background-color: #1d1d1dad;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    margin: 1rem 10px;
    padding: 2rem 0;
    transition: 1s all ease;
    border-radius: 15px;
    width: calc(100% / 3 - 20px);
    text-align: center;
}

.inner-favourite:hover {
    background: #f3a446;
}

.inner-favourite .fav-content img {
    width: 250px;
    height: 150px;
    object-fit: cover;
    border-radius: 64px 12px 64px 12px;
}

.inner-favourite:hover .fav-content img {
    transform: translateY(-10px);
}

.fav-content h3 {
    color: #a06235;
    font-size: 28px;
    padding-top: 1rem;
}

.fav-content p {
    color: white;
    padding: 1rem 0;
    padding-bottom: 2rem;
}

.fav-content a {
    padding: 0.5rem 2rem;
    color: white;
    text-decoration: none;
    background: #f3a446;
}

.fav-content a:hover {
    background-color: #1d1d1d;
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