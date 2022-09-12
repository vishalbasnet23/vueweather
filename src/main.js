import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import { resetStore } from "./methods/reset-store";

import "./assets/css/tailwind.css";
import "./assets/css/weather-icons.min.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(resetStore);

app.use(router);
app.use(pinia);

app.mount("#app");
