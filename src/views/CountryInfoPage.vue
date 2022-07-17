<template>
  <div v-if="countryInfo" class="country-info-container">
    <BaseBackBtn />
    <div class="country-info-card">
      <img
        class="country-info-img"
        :src="countryInfo.flags.png"
        :alt="countryInfo.altSpellings[0]"
      />
      <div class="country-info-info">
        <h2 class="country-info-title">{{ countryInfo.name.common }}</h2>
        <div class="country-info-position">
          <div class="country-info-main">
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Native Name:</h4>
              <div>
                <p class="country-info-desc">
                  {{ changeNativeName(countryInfo.name.nativeName) }}
                </p>
              </div>
            </div>
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Population:</h4>
              <p class="country-info-desc">
                {{ changePopulation(countryInfo.population) }}
              </p>
            </div>
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Region:</h4>
              <p class="country-info-desc">{{ countryInfo.region }}</p>
            </div>
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Sub Region:</h4>
              <p class="country-info-desc">{{ countryInfo.subregion }}</p>
            </div>
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Capital:</h4>
              <p class="country-info-desc" v-if="countryInfo.capital">
                {{ countryInfo.capital[0] }}
              </p>
              <p class="country-info-desc" v-else>-</p>
            </div>
          </div>
          <div class="country-info-sec">
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Top Level Domain:</h4>
              <div>
                <p class="country-info-desc">
                  {{ changeList(countryInfo.tld) }}
                </p>
              </div>
            </div>
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Currencies:</h4>
              <div>
                <p
                  class="country-info-desc"
                  v-for="currience in countryInfo.currencies"
                  :key="currience"
                >
                  {{ changeList(currience) }}
                </p>
              </div>
            </div>
            <div class="country-info-group">
              <h4 class="country-info-subtitle">Languages:</h4>
              <div>
                <p class="country-info-desc">
                  {{ changeList(countryInfo.languages) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="country-info-group">
          <h4 class="country-info-subtitle">Border Countries:</h4>
          <div class="country-border-block" v-if="countryInfo.borders">
            <router-link
              class="country-info-desc"
              v-for="border in countryInfo.borders"
              :key="border"
              @click="findCountry(border)"
              :to="{ path: `/${border}` }"
            >
              <p class="country-border-link">{{ border }}</p>
            </router-link>
          </div>
          <p v-else class="country-info-desc">-</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
export default {
  setup() {
    // Переменные
    const route = useRoute();
    const countryInfo = ref();
    const countryQuery = route.params.id;

    onMounted(() => {
      findCountry(countryQuery);
    });

    // Находим конкретную страну
    function findCountry(border) {
      axios
        .get(`https://restcountries.com/v3.1/name/${border}`)
        .then((responce) => {
          countryInfo.value = responce.data[0];
          getFullBorderName(countryInfo.value.borders);
        });
    }

    // Получаем полное название границы страны
    function getFullBorderName(borders) {
      if (borders) {
        for (let i = 0; i < borders.length; i++) {
          axios
            .get(`https://restcountries.com/v3.1/alpha/${borders[i]}`)
            .then((responce) => {
              countryInfo.value.borders.splice(
                i,
                1,
                responce.data[0].name.common
              );
            });
        }
      }
    }

    // Делим число на разряды
    function changePopulation(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Разделяем названия страны запятыми
    function changeNativeName(value) {
      let arr = [];

      for (let key in value) {
        arr.push(value[key].common);
      }
      return arr.join(", ");
    }

    // Разделяем списки данных запятыми
    function changeList(value) {
      let arr = [];

      for (let key in value) {
        arr.push(value[key]);
      }

      return arr.join(", ");
    }

    return {
      findCountry,
      changeList,
      changeNativeName,
      changePopulation,
      countryInfo,
      countryQuery,
    };
  },
};
</script>

<style scoped>
.country-info-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
}
.country-info-img {
  width: 550px;
  height: 300px;
  box-shadow: 0 0 20px -2px var(--c-shadow);
}
.country-info-info {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.country-info-title {
  font-size: 32px;
}
.country-info-position {
  display: flex;
}
.country-info-group,
.country-info-group div {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
}
.country-info-main {
  max-width: 250px;
}
.country-info-subtitle {
  font-weight: 600;
  padding-right: 5px;
}
.country-info-desc {
  font-weight: 300;
}
.country-border-block {
  max-width: 540px;
}
.country-border-link {
  background-color: var(--c-elements);
  margin: 0 5px 10px 10px;
  padding: 0 10px;
  box-shadow: 0 0 10px -2px var(--c-shadow);
  transition: 0.3s ease;
}
.country-border-link:hover {
  box-shadow: 0 0 20px -2px var(--c-shadow);
}
/* Адаптив */
@media only screen and (max-width: 1440px) {
  .country-info-img {
    width: 450px;
    height: 250px;
    box-shadow: 0 0 20px -2px var(--c-shadow);
  }
}
@media only screen and (max-width: 768px) {
  .country-info-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }
  .country-info-img {
    width: 100%;
    height: 250px;
    margin-bottom: 15px;
  }
  .country-info-position {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .country-info-info {
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
@media only screen and (max-width: 425px) {
  .country-info-img {
    width: 100%;
    height: 200px;
  }
}
</style>
