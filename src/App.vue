<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import MobileCart from './components/MobileCart.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    MobileCart
  }
}
</script>

<template>
  <AppHeader></AppHeader>
  <router-view></router-view>
  <MobileCart></MobileCart>
  <AppFooter></AppFooter>
</template>

<style lang="scss">
@use './styles/general.scss';
</style>
