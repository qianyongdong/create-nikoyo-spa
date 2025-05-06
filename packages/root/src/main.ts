import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { registerSpas } from "../single-spa.setup";

const app = createApp(App);

app.use(router);

registerSpas();

app.mount("#root");
