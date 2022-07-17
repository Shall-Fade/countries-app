import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import CountryInfoPage from "../views/CountryInfoPage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/:id",
      name: "info",
      component: CountryInfoPage,
    },
    {
      path: "/404",
      name: "404-not-found",
      component: NotFoundPage,
    },
  ],
});

export default router;
