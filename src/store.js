import { reactive } from "vue";

export const store = reactive({
    baseUrl: 'http://localhost:8000',

    isCartOpen: false,
    checkRestaurant : null,
    dishes: [],

    cart: '',
});