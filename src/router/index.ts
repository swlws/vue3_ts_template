import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const _import = (path: string) => () => import(`../views${path}`);

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    redirect: "/project-issue-user",
  },
  {
    path: "/project-issue-user",
    component: _import("/project-issue-user/index.vue"),
  },
  {
    path: "/user-project-issue",
    component: _import("/user-project-issue/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
