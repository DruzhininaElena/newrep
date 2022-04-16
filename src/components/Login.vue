<template>
  <div class="authorization container">
    <AlertMsg
      :msg="alertMsgError"
      :msg-color="colorMsgError"
      v-show="showAlertError"
    />
    <div class="form-card card ml-auto">
      <div class="card-body">
        <h4 class="authorization__title card-title">Авторизация</h4>
        <form @submit.prevent="onSubmit" name="loginForm">
          <div class="form-group mt-2">
            <input
              class="form-control"
              placeholder="Введите email"
              v-model="email"
              required
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="password"
              class="form-control"
              placeholder="пароль"
              v-model="password"
              required
            />
          </div>
          <div class="to-registration d-flex justify-content-between mt-2">
            <span>Нет профиля на сайте?</span>
            <router-link :to="{ path: '/registration' }">
              <a class="to-registration__link" href="#">Зарегистрироваться</a>
            </router-link>
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-2"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import AlertMsg from "./AlertMsg.vue";

export default {
  name: "AuthorizationForm",
  components: { AlertMsg },
  data: () => ({
    email: "",
    password: "",
    showAlertError: false,
    alertMsgError: "Ошибка! Попробуйте ещё раз",
    colorMsgError: "background-color: rgb(238, 175, 175)",
  }),
  computed: {
    ...mapGetters("auth", ["authorized", "getAuthToken"]),
    ...mapGetters("weather", ["getWeatherInCitiesOfRegion"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    ...mapActions("favourite", ["fetchFavouriteCities"]),
    ...mapActions("weather", ["getCurrentRegion"]),
    ...mapMutations("auth", ["SET_IS_AUTHORIZED"]),
    ...mapMutations("favourite", ["SET_AUTH_TOKEN"]),
    async onSubmit() {
      let email = this.email;
      let password = this.password;
      try {
        await this.login({email, password});
        this.email = "";
        this.password = "";
        this.SET_IS_AUTHORIZED(true);
        this.$router.push("/");
        localStorage.setItem("authorization", this.authorized);
        this.getCurrentRegion();
        this.SET_AUTH_TOKEN(this.getAuthToken);
        this.fetchFavouriteCities();
      } catch (err) {
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
        }, 2000);
      }
      
    },
  },
};
</script>

<style scoped>
.authorization {
  margin: 40px auto 0 auto;
  max-width: 400px;
}
.to-registration {
  font-size: 0.75rem;
}
.to-registration__link {
  color: inherit;
}
.to-registration__link:hover {
  color: gray;
}
</style>
