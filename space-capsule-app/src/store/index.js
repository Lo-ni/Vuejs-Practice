import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    loginUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {},
  modules: {},
});
