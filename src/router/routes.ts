import { RouteRecordRaw } from "vue-router";
const _import = (path: string) => () => import(`../views${path}`);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: _import("/home/index.vue"),
  },
];

export default routes;
