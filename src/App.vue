<template>
  <TheHeader />
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
};
</script>

<style>
@import "./assets/base.css";
</style>
