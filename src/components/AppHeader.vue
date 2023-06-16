<script>
export default {
    name: "AppHeader"
}
</script>

<template>
    <header>
        <div class="logo">
            <a href="">
                <img src="logo.gif" alt="logo" />
            </a>
        </div>

        <nav class="navbar">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/ristoranti">Restaurant</a>
                </li>
                <li>
                    <a href="/menu">Menu</a>
                </li>
                <li>
                    <a href="">About</a>
                </li>
                <li>
                    <a href="">Contact</a>
                </li>
            </ul>
        </nav>

        <div class="menu-cart fa-solid fa-cart-shopping"></div>
    </header>
</template>

<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 1000;
    background-color: rgba($color: #000000, $alpha: 0.2);
}

header .logo img {
    height: 100px;
}

header .navbar ul {
    list-style: none;
}

header .navbar ul li {
    display: inline-block;
}

header .navbar ul li a {
    text-decoration: none;
    margin-left: 1rem;
    padding: 0.5rem;
    color: #f3a446;
}

header .navbar ul li a:hover {
    color: #a06235;
}

header .menu-cart {
    font-size: 1.6rem;
    color: #f3a446;
    cursor: pointer;
}
</style>