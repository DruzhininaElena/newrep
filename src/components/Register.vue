<template>
  <div class="registration container">
    <AlertMsg
      :msg="alertMsgSucces"
      :msg-color="colorMsgSucces"
      v-show="showAlertSucces"
    />
    <AlertMsg
      :msg="alertMsgError"
      :msg-color="colorMsgError"
      v-show="showAlertError"
    />
    <div class="form-card card ml-auto">
      <div class="card-body">
        <h4 class="registration__title card-title">Регистрация</h4>
        <form @submit.prevent="onSubmit" name="loginForm">
          <div class="form-group mt-2">
            <input
              type="text"
              class="form-control"
              placeholder="Введите ваше имя"
              required
              v-model="name"
            />
          </div>
          <div class="form-group mt-2">
            <input
              class="form-control"
              placeholder="Ваш email"
              required
              v-model="email"
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="password"
              class="form-control"
              placeholder="Придумайте пароль"
              required
              v-model="password"
            />
          </div>
          <button
            type="submit"
            class="btn btn-primary mt-2"
          >
            Отправить
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import AlertMsg from "./AlertMsg.vue";

export default {
  name: "AuthorizationForm",
  components: { AlertMsg },
  data: () => ({
    name: "",
    email: "",
    password: "",
    showAlertSucces: false,
    showAlertError: false,
    alertMsgSucces: "Вы успешно зарегистрировались",
    alertMsgError: "Ошибка! Попробуйте ещё раз",
    colorMsgSucces: "background-color: rgb(175, 238, 197)",
    colorMsgError: "background-color: rgb(238, 175, 175)",
  }),
  computed: {},
  methods: {
    ...mapActions("auth", ["register"]),
    async onSubmit() {
      let name = this.name;
      let email = this.email;
      let password = this.password;
      
      try {
        await this.register({ name, email, password });
        this.name = "";
        this.email = "";
        this.password = "";
        this.showAlertSucces = true;
        setTimeout(() => {
          this.showAlertSucces = false;
          this.$router.push("/autorization");
        }, 2000);
      } catch (err) {
        this.showAlertError = true;
        setTimeout(() => {
          this.showAlertError = false;
        }, 2000);
        console.log(err)
      }
    },
  },
};
</script>

<style scoped>
.registration {
  margin: 40px auto 0 auto;
  max-width: 400px;
}
</style>
