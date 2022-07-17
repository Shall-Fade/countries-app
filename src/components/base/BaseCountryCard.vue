<template>
  <div class="country-card-container">
    <router-link :to="{ path: `/${country}` }">
      <slot name="image"></slot>
      <div class="country-card-info">
        <h2 class="country-card-title">
          <slot name="title"></slot>
        </h2>
        <div>
          <h4 class="country-card-subtitle">Population:</h4>
          <p class="country-card-desc">
            <slot name="population"></slot>
          </p>
        </div>
        <div>
          <h4 class="country-card-subtitle">Region:</h4>
          <p class="country-card-desc">
            <slot name="region"></slot>
          </p>
        </div>
        <div>
          <h4 class="country-card-subtitle">Capital:</h4>
          <p class="country-card-desc">
            <slot name="capital"></slot>
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["country"],
};
</script>

<style scoped>
.country-card-container {
  width: 300px;
  box-shadow: 0 0 10px -2px var(--c-shadow);
  cursor: pointer;
  transition: 0.3s ease;
}
.country-card-container:hover {
  box-shadow: 0 10px 30px 0 var(--c-shadow);
}
.country-card-info {
  padding: 0 15px 45px 15px;
  border-radius: 5px;
  background-color: var(--c-elements);
}
.country-card-info div {
  display: flex;
  align-items: center;
}
.country-card-title {
  padding: 15px 0;
}
.country-card-subtitle {
  font-weight: 600;
  padding-right: 5px;
}
.country-card-desc {
  color: var(--c-text);
  font-weight: 300;
}
/* Адаптив */
@media only screen and (max-width: 1440px) {
  .country-card-container {
    width: 290px;
  }
}
@media only screen and (max-width: 1024px) {
  .country-card-container {
    width: 200px;
  }
}
@media only screen and (max-width: 768px) {
  .country-card-container {
    width: 100%;
  }
}
</style>
