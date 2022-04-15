<template>
  <div class="authorization container">
    <div class="form-card card ml-auto">
      <div class="card-body">
        <h4 class="authorization__title card-title">Авторизация</h4>
        <form name="loginForm">
          <div class="form-group mt-2">
            <input
              type="email"
              class="form-control"
              placeholder="Введите email"
              data-required="email"
              data-invalid-message="Пожалуйста используйте валидный email example@example.com"
              v-model="email"
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="password"
              class="form-control"
              placeholder="пароль"
              data-required="password"
              v-model="password"
            />
          </div>
          <div class="to-registration d-flex justify-content-between mt-2">
            <span>Нет профиля на сайте?</span>
            <router-link :to="{ path: '/registration' }">
              <a class="to-registration__link" href="#">Зарегистрироваться</a>
            </router-link>
          </div>
          <button
            @click.prevent="onSubmit"
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

export default {
  name: "AuthorizationForm",
  components: {},
  data: () => ({
    email: "",
    password: "",
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
        // notify({ msg: 'Login success', className: 'alert-success' });
      } catch (err) {
        // notify({ mas: 'Login faild', className: 'alert-danger' });
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
