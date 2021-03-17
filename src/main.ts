import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "./components/index";
import http from "@/api/http";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(components);
app.mount("#app");

http.post("/api/v1/menus/:id", { id: 123, name: 123 }).then(console.log);
