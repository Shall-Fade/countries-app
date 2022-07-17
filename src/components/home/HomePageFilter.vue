<template>
  <div class="filter-container">
    <form class="filter-form" @submit.prevent="sendRequest">
      <input
        class="filter-search"
        type="text"
        placeholder="Search for a country..."
        v-model="countryName"
      />
      <select
        @click="searchByRegion"
        v-model="regionName"
        class="filter-select"
      >
        <option value="" disabled selected>Filter by Region</option>
        <option value="africa">Africa</option>
        <option value="america">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
export default {
  setup() {
    // Переменные
    const router = useRouter();
    const store = useStore();
    const regionName = ref("");
    const countryName = ref("");
    const countries = ref();

    // Находим страны по названию
    function sendRequest() {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryName.value}`)
        .then((responce) => {
          countries.value = responce.data;
          store.commit("SAVE_COUNTRY_DATA", countries.value);
          regionName.value = "";
        })
        .catch((err) => {
          if (err.response.data.status === 404) {
            router.push("/404");
          }
        });
    }

    // Находим страны по региону
    function searchByRegion() {
      if (regionName.value) {
        axios
          .get(`https://restcountries.com/v3.1/region/${regionName.value}`)
          .then((responce) => {
            countries.value = responce.data;
            store.commit("SAVE_COUNTRY_DATA", countries.value);
          });
      }
    }

    return {
      regionName,
      countryName,
      sendRequest,
      searchByRegion,
    };
  },
};
</script>

<style scoped>
.filter-container {
  margin: 50px 0;
}
.filter-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-search,
.filter-select,
.filter-select option {
  border: none;
  outline: none;
  background: none;

  color: var(--c-text);
  background-color: var(--c-elements);
  font-family: "Nunito Sans", sans-serif;
  border-radius: 5px;
  font-weight: 300;
  box-shadow: 0 0 10px -2px var(--c-shadow);
}
.filter-search {
  width: 400px;
  padding: 15px 40px;
}
.filter-search::placeholder {
  color: var(--c-text);
}
.filter-select {
  cursor: pointer;
  padding: 15px 35px 15px 15px;
}
/* Адаптив */
@media only screen and (max-width: 1024px) {
  .filter-search {
    width: 250px;
  }
}
@media only screen and (max-width: 768px) {
  .filter-search {
    width: 210px;
  }
  .filter-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .filter-search {
    width: 100%;
    padding: 15px 40px;
    margin-bottom: 30px;
  }
}
</style>
