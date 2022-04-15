import axios from "axios";

const authStore = {
  namespaced: true,
  state: {
    domainName: "https://front-test.academy.smartworld.team/api",
    isAuthorized: localStorage.getItem("authorization") || false,
    authToken: "",
    socketToken: "",
    userId: ""
  },
  getters: {
    authorized({ isAuthorized }) {
      return isAuthorized;
    },
    getAuthToken({ authToken }) {
      return authToken;
    },
    getSocketToken({ socketToken }) {
      return socketToken;
    }
  },
  mutations: {
    SET_IS_AUTHORIZED(state, boolen) {
      state.isAuthorized = boolen;
    },
    SET_AUTH_TOKEN(state, token) {
      state.authToken = token;
    },
    SET_SOCKET_TOKEN(state, token) {
      state.socketToken = token;
    },
    SET_USER_ID (state, id) {
      state.userId = id;
    }
  },
  actions: {
    async login({ state, commit }, { email, password }) {
      try {
        const response = await axios.post(
          `${state.domainName}/api/login`,
          JSON.stringify({ email, password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        let authToken = response.data.data.authToken.token;
        let socketToken = response.data.data.socketToken;
        let userId = response.data.data.userId;
        commit("SET_AUTH_TOKEN", authToken);
        commit("SET_SOCKET_TOKEN", socketToken);
        commit("SET_USER_ID", userId);
        localStorage.setItem("authToken", authToken);
      } catch (err) {
        console.log(err);
      }
    },
    async register({ state }, { name, email, password }) {
      try {
        const response = await axios.post(
          `${state.domainName}/api/register`,
          JSON.stringify({ name, email, password }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return response.data;
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    async logout({ state }) {
      try {
        const response = await axios.get(`${state.domainName}/api/logout`);
        return response.data;
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
  },
};

export default authStore;
