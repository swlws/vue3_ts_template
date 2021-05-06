import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import components from "./components/index";
import apis from "./api/main";
import ElementUI from "./plugin/element";

const app = createApp(App);
app.use(ElementUI);
app.use(router);
app.use(components);
app.mount("#app");

app.config.performance = true;
app.config.globalProperties.$api = apis;
app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info);
};
app.config.warnHandler = (msg, vm, trace) => {
  console.error(msg, vm, trace);
};
