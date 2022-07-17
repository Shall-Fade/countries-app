<template>
  <HomePageFilter />
  <HomePageResult />
</template>

<script>
import HomePageFilter from "../components/home/HomePageFilter.vue";
import HomePageResult from "../components/home/HomePageResult.vue";
export default {
  components: { HomePageFilter, HomePageResult },
};
</script>
