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
              <router-link :to="{ path: '/favourite' }">
                <a class="nav-link" href="#" v-show="authorized">Избранное</a>
              </router-link>
              <router-link :to="{ path: '/cities' }">
                <a class="nav-link" @click="getCurrentRegion" href="#"
                  >Города региона
                </a>
              </router-link>
            </div>
          </div>
          <div class="navbar-nav d-flex align-items-center" v-if="!authorized">
            <LogInIcon size="1.1x"></LogInIcon>
            <router-link :to="{ path: '/registration' }">
              <a class="nav-link" href="#">Регистрация</a>
            </router-link>
            <span>|</span>
            <router-link :to="{ path: '/autorization' }">
              <a class="nav-link" href="#">Вход</a>
            </router-link>
          </div>
          <div class="navbar-nav d-flex align-items-center" v-else>
            <LogOutIcon size="1.1x"></LogOutIcon>
            <a @click="onLogOut" class="nav-link" href="#">Выйти</a>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { LogOutIcon, LogInIcon } from "vue-feather-icons";

export default {
  name: "NavMenu",
  components: {
    LogOutIcon,
    LogInIcon,
  },
  computed: {
    ...mapGetters("auth", ["authorized"]),
  },
  methods: {
    ...mapActions("weather", ["getCurrentRegion"]),
    ...mapActions("auth", ["logout"]),
    ...mapMutations("auth", ["SET_IS_AUTHORIZED"]),
    onLogOut() {
      // this.logout();
      this.SET_IS_AUTHORIZED(false);
      localStorage.removeItem("authorization");
      localStorage.removeItem("authToken");
      if (this.$route.path === "/favourite") {
        this.$router.push("/");
      }
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
.autorization {
  display: flex;
  justify-content: flex-end;
}
</style>
