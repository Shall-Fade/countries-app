<template>
  <div class="result-container">
    <base-country-card
      :country="country.name.common"
      v-for="country in countries"
      :key="country.area"
    >
      <template v-slot:image>
        <img
          class="country-card-image"
          :src="country.flags.png"
          :alt="country.altSpellings[0]"
        />
      </template>
      <template v-slot:title>{{ country.name.common }}</template>
      <template v-slot:population>{{
        changePopulation(country.population)
      }}</template>
      <template v-slot:region>{{ country.region }}</template>
      <template v-if="country.capital" v-slot:capital>{{
        country.capital[0]
      }}</template>
      <template v-else v-slot:capital>-</template>
    </base-country-card>
  </div>
</template>

<script>
import { useStore } from "vuex";
import axios from "axios";
import { computed, onMounted } from "vue";
export default {
  setup() {
    // Переменные
    const store = useStore();
    const countries = computed(() => store.state.countries);

    // Получаем карточки всех стран
    onMounted(() => {
      axios.get("https://restcountries.com/v3.1/all").then((responce) => {
        store.commit("SAVE_COUNTRY_DATA", responce.data);
      });
    });

    // Делим число на разряды
    function changePopulation(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return {
      countries,
      changePopulation,
    };
  },
};
</script>

<style scoped>
.result-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  gap: 80px;
}
.country-card-image {
  border-radius: 5px;
  width: 300px;
  height: 160px;
}
/* Адаптив */
@media only screen and (max-width: 1440px) {
  .result-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .country-card-image {
    border-radius: 5px;
    width: 290px;
    height: 160px;
  }
}
@media only screen and (max-width: 1024px) {
  .result-container {
    grid-template-columns: repeat(3, 1fr);
  }
  .country-card-image {
    border-radius: 5px;
    width: 200px;
    height: 120px;
  }
}
@media only screen and (max-width: 768px) {
  .result-container {
    grid-template-columns: repeat(1, 1fr);
  }
  .country-card-image {
    border-radius: 5px;
    width: 100%;
    height: 220px;
  }
}
</style>
