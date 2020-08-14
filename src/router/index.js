import Vue from "vue";
import VueRouter from "vue-router";

const login = () => import("../views/login");
const home = () => import("../views/home");
const welcome = () => import("../views/welcome");
const users = () => import("../components/user/users");

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
    children:[
      {
        path:'/welcome',
        name:'welcome',
        component:welcome
      },
      {
        path:'/users',
        name:'users',
        component:users
      }
    ]
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
