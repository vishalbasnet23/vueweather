import { createApp } from "vue";
import { createPinia } from "pinia";
import { markRaw } from "vue";

import App from "./App.vue";
import router from "./router";

import { resetStore } from "./methods/reset-store";

import "./assets/css/tailwind.css";
import "./assets/css/weather-icons.min.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(resetStore);

app.use(pinia);
pinia.use(({ store }) => {
  store.$router = markRaw(router);
});
app.use(router);
app.mount("#app");
