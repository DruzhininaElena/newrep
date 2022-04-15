import Vue from "vue";
import Vuex from "vuex";
import weather from "./modules/weather";
import auth from "./modules/auth";
import favourite from "./modules/favouriteCities"

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    weather,
    auth,
    favourite
  }
});

export default store;
