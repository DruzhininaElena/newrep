import Vue from "vue";
import Vuex from "vuex";
import weather from "./modules/weather";
import cities from "./modules/cities"

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    weather,
    cities,
  }
});

export default store;
