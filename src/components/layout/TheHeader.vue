<template>
  <div class="header-container">
    <div class="wrapper">
      <div class="header-block">
        <h1 class="header-title">Where in the world?</h1>
        <button @click="switchMode" class="header-switch-btn">
          <i v-if="isLight" class="fa-regular fa-moon"></i>
          <i v-else class="fa-solid fa-moon"></i>
          Dark Mode
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const isLight = computed(() => store.state.isLight);
    const lightMode = ref();

    onMounted(() => {
      lightMode.value = isLight.value;

      if (lightMode.value === true) {
        document.documentElement.setAttribute("data-theme", "light");
      } else if (lightMode.value === false) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    });

    function switchMode() {
      lightMode.value = !lightMode.value;
      store.commit("TOGGLE_MODE", lightMode.value);

      if (lightMode.value === true) {
        document.documentElement.setAttribute("data-theme", "light");
      } else if (lightMode.value === false) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    }

    return {
      switchMode,
      isLight,
    };
  },
};
</script>

<style scoped>
.header-container {
  position: sticky;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
  background-color: var(--c-elements);
  padding: 20px 0;
  box-shadow: 0 0 10px -2px var(--c-shadow);
}
.header-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-switch-btn {
  display: flex;
  align-items: center;
  padding: 5px 0 5px 5px;
  font-weight: 600;
  font-size: 16px;
}
.header-switch-btn i {
  padding-right: 7px;
}
.fa-solid {
  color: var(--c-text);
}
/* Адаптив */
@media only screen and (max-width: 768px) {
  .header-title {
    font-size: 17px;
  }
}
</style>
