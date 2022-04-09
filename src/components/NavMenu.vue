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
              <a class="nav-link" href="#">Прогноз на неделю</a>
              <a class="nav-link" href="#">Прогноз на месяц</a>
              <a class="nav-link" href="#">Избранное</a>
              <router-link :to="{ path: '/cities' }">
                <a class="nav-link" @click="getCurrentRegion" href="#"
                  >Города региона
                </a>
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "NavMenu",
  methods: {
    ...mapActions("weather", ["getCurrentRegion"]),
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
</style>
