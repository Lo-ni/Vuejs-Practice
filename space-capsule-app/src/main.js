import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(VueFormulate);
Vue.use(axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
