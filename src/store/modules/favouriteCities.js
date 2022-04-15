import axios from "axios";

const favouriteStore = {
  namespaced: true,
  state: {
    domainName: "https://front-test.academy.smartworld.team/api",
    authToken: localStorage.getItem("authToken"),
    favouriteCitiesList: "",
  },
  getters: {
    getFavouriteCitiesList({ favouriteCitiesList }) {
      return favouriteCitiesList;
    },
  },
  mutations: {
    SET_FAVOURITE_CITIES_LIST(state, citiesList) {
      state.favouriteCitiesList = citiesList;
    },
    SET_AUTH_TOKEN(state, token) {
      state.authToken = token;
    },
  },
  actions: {
    async fetchFavouriteCities({ state, commit }) {
      if (!state.authToken) {
        return;
      }
      try {
        const response = await axios.get(
          `${state.domainName}/City/getFavourite`,
          {
            headers: {
              Authorization: `Bearer ${state.authToken}`,
            },
          }
        );
        commit("SET_FAVOURITE_CITIES_LIST", response.data.data);
      } catch (err) {
        console.log(err);
      }
    },
    async addCityInFavourite({ state }, {id, name, api_city_id}) {
      if (!state.authToken) {
        return;
      }
      try {
        const response = await axios.post(
          `${state.domainName}/City/add/${id}`,
          JSON.stringify({id, name, api_city_id}),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.authToken}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    async removeCityFromFavourite({ state, dispatch }, id) {
      try {
        const response = await axios.delete(
          `${state.domainName}/City/remove/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.authToken}`,
            },
          }
        );
        dispatch('fetchFavouriteCities');
        return response.data;
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
  },
};

export default favouriteStore;
