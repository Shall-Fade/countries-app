import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import BaseCountryCard from "./components/base/BaseCountryCard.vue";
import BaseBackBtn from "./components/base/BaseBackBtn.vue";

const app = createApp(App);

app.component("BaseCountryCard", BaseCountryCard);
app.component("BaseBackBtn", BaseBackBtn);

app.use(router);
app.use(store);

app.mount("#app");
