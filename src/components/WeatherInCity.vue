<template>
  <div class="weather-in-city container">
    <AlertMsg :msg="alertMsgSucces" :msg-color="colorMsgSucces" v-if="showAlertSucces"/>
    <AlertMsg :msg="alertMsgError" :msg-color="colorMsgError" v-if="showAlertError"/>
    <div class="weather-in-city__card card">
      <div class="weather-in-city__body card-body">
        <div v-show="authorized">
          <div class="d-flex justify-content-end">
            <b-button @click="addCityToFavourite" variant="light" size="sm"
              >В избранное</b-button
            >
          </div>
        </div>
        <h2 class="card-title">{{ getWeatherData.city }}</h2>
        <p class="card-text">Текущие дата и время: {{ time }}</p>
        <div class="div d-flex align-items-center justify-content-center">
          <span class="weather-in-city__temp">{{ getWeatherData.temp }}</span>
          <img :src="getWeatherData.icon" alt="icon" />
        </div>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Ветер: {{ getWeatherData.windSpeed }}
          {{ getWeatherData.windDirection }}
        </li>
        <li class="list-group-item">
          Облачность: {{ getWeatherData.clouds }}%
        </li>
        <li class="list-group-item">Давление: {{ getWeatherData.pressure }}</li>
        <li class="list-group-item">
          Влажность: {{ getWeatherData.humidity }}%
        </li>
      </ul>
    </div>
    <DailyWeather />
    <DayLenght />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DailyWeather from "./DailyWeather.vue";
import DayLenght from "./DayLenght.vue";
import AlertMsg from "./AlertMsg.vue"

export default {
  name: "WeatherInCity",
  components: {
    DailyWeather,
    DayLenght,
    AlertMsg
  },
  data: () => ({
    time: new Date().toLocaleString(),
    showAlertSucces: false,
    showAlertError: false,
    alertMsgSucces: "Добавлено в избранное",
    colorMsgSucces: "background-color: rgb(175, 238, 197)",
    alertMsgError: "Данный город уже добавлен в избранное",
    colorMsgError: "background-color: rgb(238, 175, 175)",
  }),
  computed: {
    ...mapGetters("weather", ["getWeatherData", "getWeatherInCitiesOfRegion"]),
    ...mapGetters("auth", ["authorized"]),
    ...mapGetters("favourite", ["getFavouriteCitiesList"]),
  },
  methods: {
    ...mapActions("favourite", ["addCityInFavourite"]),
    ...mapActions("weather", ['getCurrentRegion']),
    async addCityToFavourite() {
      let currentCity = this.getWeatherData.city;
      let currentCityData = this.getWeatherInCitiesOfRegion.filter(el => el.city === currentCity);
      let cityId = currentCityData[0].id;
      try {
        await this.addCityInFavourite({
          id: cityId,
          name: this.getWeatherData.city,
          api_city_id: this.getWeatherData.id,
        });
        this.showAlertSucces = true;
        setTimeout(() => {this.showAlertSucces = false}, 2500)
      } catch (error) {
        console.log(error);
        this.showAlertError = true;
        setTimeout(() => {this.showAlertError = false}, 2500);
      }
    },
  },
};
</script>

<style scoped>
.weather-in-city__card {
  margin: 40px auto 0 auto;
  width: 75%;
}
@media (max-width: 767px) {
  .weather-in-city__card {
    width: 100%;
  }
}
.weather-in-city__favorites {
  font-size: 0.75rem;
}
.favorites__label {
  margin-left: 5px;
}
.weather-in-city__body {
  color: white;
  background-image: url("../assets/sky.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 3px;
}
.weather-in-city__temp {
  font-size: 56px;
}
</style>
