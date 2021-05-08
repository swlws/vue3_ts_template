import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import menu from "../data/menus";

const _import = (path: string) => () => import(`../views${path}/index.vue`);

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes],
});

function noAuth(path: string) {
  const obj = routes.find((item) => item.path === path);

  return obj ? true : false;
}

function generateRoutes() {
  const routes = [];
  for (const { path, label } of menu) {
    if (!path) continue;

    routes.push({
      path: path,
      component: _import(path),
      meta: {
        title: label,
      },
    });
  }

  return routes;
}

function auth(path: string) {
  const routes = generateRoutes();
  const redirect = routes[0].path;

  router.addRoute({
    path: "/home",
    component: _import("/home"),
    children: generateRoutes(),
    redirect,
  });

  router.push(path || redirect);
}

let loadEnd = false;
router.beforeEach((to, from, next) => {
  const path = to.path;

  if (noAuth(path)) {
    next();
  } else if (loadEnd === false) {
    auth(to.fullPath);
    loadEnd = true;
  }

  const title: string = to.meta.title as string;
  if (title) {
    document.title = `VUE3-${title}`;
  }
  next();
});

export default router;
