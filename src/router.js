import { createRouter, createWebHistory } from "vue-router";

import AppHome from './pages/AppHome.vue';
import RestaurantList from './pages/RestaurantList.vue';
import RestaurantMenu from './pages/RestaurantMenu.vue';

const router = createRouter(
    {
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                name: 'home',
                component: AppHome
            },
            {
                path: '/ristoranti',
                name: 'ristoranti',
                component: RestaurantList
            },
            {
                path: '/menu',
                name: 'menu',
                component: RestaurantMenu
            }
        ]
    }
);

export { router };