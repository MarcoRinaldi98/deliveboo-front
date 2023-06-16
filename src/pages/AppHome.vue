<script>
export default {
    name: "AppHome"
}
</script>

<template>
    <section id="jumbotron">

        <div class="container-fluid">
            <div class="main-home-section row">
                <div class="inner-home-section col-6">
                    <div class="left-content">
                        <h1>Deliveboo</h1>
                        <p>In pochi minuti il piatto che desiteri a casa tua!</p>

                        <a href="#">Sfoglia i nostri ristoranti</a>
                    </div>
                </div>
                <div class="inner-home-section col-6">
                    <div class="right-image">
                        <img src="Tomato Sauce.png" alt="immagine piatto di presentazione">
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
    height: 100vh;
}

#jumbotron .main-home-section {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    flex-wrap: wrap;
    padding: 0 5rem;
}

#jumbotron .main-home-section .inner-home-section .left-content h1 {
    color: #a06235;
    font-size: 80px;
    line-height: 2.5rem;
}

#jumbotron .main-home-section .inner-home-section .left-content p {
    color: #f3a446;
    font-size: 1.5rem;
    padding: 2rem 0 5rem 0;
    text-align: left;
}

#jumbotron .main-home-section .inner-home-section .left-content a {
    text-decoration: none;
    color: #1d1d1d;
    font-weight: 600;
    padding: 1rem 3rem;
    background-color: #f3a446;
    transition: 0.6s all ease;
}

#jumbotron .main-home-section .inner-home-section .left-content a:hover {
    color: white;
    border-radius: 15px;
}

#jumbotron .main-home-section .inner-home-section .right-image {
    width: 100%;
    height: 100%;
    margin-top: 50px;
}
</style>