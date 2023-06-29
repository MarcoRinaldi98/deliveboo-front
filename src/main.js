import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js';
import "bootstrap";

createApp(App).use(router).mount('#app')

// Braintree checkouut route 
const checkout = require('../routes/checkout');
App.use('/checkout', checkout);