import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局实例
// import _CodeMirror from "codemirror";
// 核心样式
import "codemirror/lib/codemirror.css";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
