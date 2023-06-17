<script>
export default {
    name: "AppHeader"
}
</script>

<template>
    <header class="container-fluid">
        <!-- Logo -->
        <div class="ms_logo">
            <a href="">
                <img src="logo.gif" alt="logo" />
            </a>
        </div>
        <!-- Navbar -->
        <nav class="ms_navbar">
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
        <!-- Dropdown Menu -->
        <div class="dropdown-center d-md-none">
            <i class="fa-solid fa-bars" data-bs-toggle="dropdown"></i>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/">Home</a></li>
                <li><a class="dropdown-item" href="/ristoranti">Restaurant</a></li>
                <li><a class="dropdown-item" href="/menu">Menu</a></li>
                <li><a class="dropdown-item" href="/">About</a></li>
                <li><a class="dropdown-item" href="/">Contact</a></li>
            </ul>
        </div>
        <!-- Cart -->
        <div class="ms_cart fa-solid fa-cart-shopping"></div>
    </header>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #000;
    padding: 0 2rem;

    & .ms_logo {
        height: 100%;

        & img {
            height: 100%;
            line-height: 100px;
        }
    }

    & .ms_navbar {
        display: none;
        height: 100%;
        line-height: 100px;

        & ul {
            list-style: none;

            & li {
                display: inline-block;
                position: relative;

                & a {
                    text-decoration: none;
                    padding: 100% 1.5rem;
                    color: #f3a446;

                    &:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        width: 100%;
                        height: 2px;
                        background-color: #f3a446;
                        border-radius: 4px;
                        scale: 0 1;
                        transform-origin: right;
                        transition: scale 0.5s;
                    }

                    &:hover::before {
                        scale: 1;
                        transform-origin: left;
                    }
                }
            }
        }
    }

    & .dropdown-center {

        & .dropdown-menu {
            width: 100vh;
            background-color: #1d1d1d;

            & li a {
                color: #f3a446;
                padding: 1rem 0 1rem 2rem;
            }
        }
    }

    & .fa-bars {
        font-size: 1.6rem;
        color: #f3a446;
        cursor: pointer;
        height: 100%;
        line-height: 100px;
    }

    & .ms_cart {
        font-size: 1.6rem;
        color: #f3a446;
        cursor: pointer;
        height: 100%;
        line-height: 100px;
    }
}


/* Interazioni */
header .ms_navbar ul li a:hover {
    color: #a06235;
}

header .dropdown-center ul li:hover {
    background-color: #f3a446 !important;
}

/* MEDIA QUERY */
@media(min-width:768px) {
    header {
        justify-content: space-around;
        padding: 0;

        & .ms_navbar {
            display: block;
        }
    }
}
</style>