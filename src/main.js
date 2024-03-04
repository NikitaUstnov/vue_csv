import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import PrimeVue from "primevue/config";
import Toast from "vue-toastification";

import "normalize.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
import "handsontable/dist/handsontable.full.css";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.use(router).use(store).use(PrimeVue).use(Toast, {}).mount("#app");
