import citiesData from '../citiesData/cities'

const citiesStore = {
  namespaced: true,
  state: {
    cities: citiesData,
    currentCity:'',
  },
  getters: {
    getCities(state) {
      return state.cities
    }
  },
  mutations: {
   SET_CURRENT_CITY(state, city) {
     state.currentCity = city
   }
  },
  actions: {
    getCurrentCity({ commit }) {
      let currentCity = this.$store.getters.getWeatherData.city;
      commit('SET_CURRENT_CITY', currentCity)
    }
  },
};

export default citiesStore;
