<template>
  <div class="nav-menu">
    <header class="header">
      <nav class="navbar navbar-expand-md navbar-light">
        <div class="container">
          <router-link :to="{ path: '/' }">
            <a class="navbar-brand" href="#">
              <img
                class="header__logo"
                src="../assets/logo.svg"
                alt="Logo"
              /> </a
          ></router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <router-link :to="{ path: '/daily' }">
                <a class="nav-link">Прогноз на неделю</a>
              </router-link>
              <router-link :to="{ path: '/day-length' }">
                <a class="nav-link">Световой день</a>
              </router-link>
            </div>
          </div>
          <form class="form-inline search">
            <input v-model.trim="searchValue" class="form-control mr-sm-2" type="search" placeholder="Поиск города" aria-label="Search">
            <button @click.prevent="search"  class="btn btn-outline-success my-2 my-sm-0" type="submit">Поиск</button>
          </form>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex"

export default {
  name: "NavMenu",
  components: {
  },
  data: () => ({
    searchValue: ''
  }),
  computed: {
    ...mapState("weather", ["apiBase", "apiKey"]),
    ...mapGetters("weather", ["getCurrentLat", "getCurrentLong"])
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherData"]),
    search() {
      this.fetchWeatherData({
        url: `${this.apiBase}weather`,
        params: {
          params: {
            q: this.searchValue,
            units: "metric",
            APPID: this.apiKey,
            lang: "ru",
          },
        },
        mutation: "SET_WEATHER_DATA",
      })
      this.fetchWeatherData({
        url: `${this.apiBase}onecall`,
        params: {
          params: {
            lat: this.getCurrentLat,
            lon: this.getCurrentLong,
            exclude: "hourly,alerts,minutely",
            units: "metric",
            APPID: this.apiKey,
            lang: "ru",
          },
        },
        mutation: "SET_DAILY_WEATHER_DATA",
      });
      this.searchValue = ''
    }
  },
};
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .navbar {
    background-color: white;
  }
  .header__logo {
    width: 30px;
    height: 30px;
  }
  .search {
    display: flex;
  }
</style>
