import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CityView from "../views/CityView.vue";
import SettingsView from "../views/SettingsView.vue";
import { useSettingsStore } from "../stores/settings";
import { storeToRefs } from "pinia";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home",
      },
    },
    {
      path: "/weather/:state/:city",
      name: "city",
      component: CityView,
      meta: {
        title: "City Weather",
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
      meta: {
        title: "Settings",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state ? `${to.params.city}, ${to.params.state}` : to.meta.title
  } | The Local Weather`;
  next();
});

router.beforeEach((to, from, next) => {
  const userStore = useSettingsStore();
  const { isFirstTime } = storeToRefs(userStore);
  if (isFirstTime.value && to.name !== "settings") next({ name: "settings" });
  else next();
});

export default router;
