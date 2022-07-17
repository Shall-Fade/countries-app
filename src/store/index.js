import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state: {
    countries: null,
    isLight: true,
  },
  mutations: {
    SAVE_COUNTRY_DATA(state, countries) {
      state.countries = countries;
    },
    TOGGLE_MODE(state, isLight) {
      state.isLight = isLight;
    },
  },
});

export default store;
