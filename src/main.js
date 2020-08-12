import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import message from "element-ui"
import "element-ui/lib/theme-chalk/index.css";
// 全局样式表
import "./assets/css/global.css";
// 字体图标
import "./assets/fonts/iconfont.css";
import http from "../http.js";

Vue.prototype.$http = http;
Vue.prototype.$message = message;
Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
