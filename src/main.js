import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/bootstrap";
import router from "./router/router";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
