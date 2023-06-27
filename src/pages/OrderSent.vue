<script>
import { store } from '../store.js';

export default {
    name: "OrderSent",
    data() {
        return {
            store
        };
    },

    methods: {
        // Funzione per essere rimandati alla Home
        returnToHome() {
            this.$router.push({ name: "home" });
        },
        // Funzione per resettare il carrello dopo l'invio dell'ordine
        resetCart() {
            JSON.parse(sessionStorage.getItem('cart'))
            this.store.cart = '';
            sessionStorage.setItem('cart', JSON.stringify(this.store.cart))
        },
    },

    mounted() {
        this.resetCart();
        // Dopo 5 secondi rimando l'utente alla Home
        setTimeout(this.returnToHome, 5000);
    },
};
</script>

<template>
    <section id="order-sent" class="d-flex justify-content-center align-items-center">
        <!-- Messaggio di successo dell'invio dell'ordine -->
        <div class="ms_message rounded-4 p-5">
            <h2>Ordine confermato! <i class="fa-solid fa-circle-check"></i></h2>

            <span class="d-block mt-4">Stai per essere riportato alla pagina principale.</span>
            <span>
                Se la pagina non si carica,
                <router-link class="text-white text-uppercase text-decoration-none" :to="{ name: 'home' }">
                    clicca qui
                </router-link>.
            </span>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@import "../styles/partials/variables";
@import "../styles/partials/mixins";

#order-sent {
    @include bg-image;
    height: calc(100vh - 100px);

    & .ms_message {
        color: $primary-color;
        background-color: rgba($color-black, 0.8);
        border: 3px solid $primary-color;
        margin-top: -100px;
    }
}
</style>
