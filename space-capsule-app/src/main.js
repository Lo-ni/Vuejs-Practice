import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toastr from "vue-toastr";
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false;
Vue.use(VueFormulate);
Vue.use(axios);
Vue.use(Toastr);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
