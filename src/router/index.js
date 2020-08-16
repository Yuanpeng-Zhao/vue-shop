import Vue from "vue";
import VueRouter from "vue-router";

const login = () => import("../views/login");
const home = () => import("../views/home");
const welcome = () => import("../views/welcome");
const users = () => import("../components/user/users");
const Rights = () => import("../components/power/Rights.vue");
const Roles = () => import("../components/power/Roles.vue");

const Cate = () => import("../components/goods/Cate.vue");
const Params = () => import("../components/goods/Params.vue");

const GoodsList = () => import("../components/goods/List.vue");
const Add = () => import("../components/goods/Add.vue");

const Order = () => import("../components/order/Order.vue");
const Report = () => import("../components/report/Report.vue");

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
    redirect: "/welcome",
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: welcome,
      },
      {
        path: "/users",
        name: "users",
        component: users,
      },
      {
        path: "/rights",
        component: Rights,
      },
      {
        path: "/roles",
        component: Roles,
      },
      {
        path: "/categories",
        component: Cate,
      },
      {
        path: "/params",
        component: Params,
      },
      {
        path: "/goods",
        component: GoodsList,
      },
      {
        path: "/goods/add",
        component: Add,
      },
      {
        path: "/orders",
        component: Order,
      },
      {
        path: "/reports",
        component: Report,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === "/login") return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token");
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next("/login");
  next();
});

export default router;
