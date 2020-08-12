import Vue from "vue";
import VueRouter from "vue-router";

const login = () => import("../views/login");
const home = () => import("../views/home");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/home",
    name: "home",
    component: home,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // to将要访问的路径
  // from代表从哪个路径跳转过来
  // next是一个函数，表示放行
  // next（）放行       next（‘/login’） 强制跳转
  if (to.path === "/login") {
    return next();
    const tokenStr = window.sessionStorage.getItem("token");
    // 没有token强制跳转登录页
    if (!tokenStr) {
      next("/login");
    }
    next();
  }
});

export default router;
