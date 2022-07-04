<template>
  <div class="weather-daily container overflow-hidden">
    <h2 class="weather-daily__title">Прогноз погоды на неделю (г. {{getCurrentCityName}})</h2>
    <div class="weather-daily__cards row g-3">

        <ItemDailyWeather :day="day" v-for="day in dailyWeather" :key="day.id" />

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from "vuex";
import ItemDailyWeather from "./ItemDailyWeather.vue";

export default {
  name: "WeatherFor10days",
  components: {
    ItemDailyWeather
  },
  data: () => ({}),
  computed: {
    ...mapGetters("weather", ["dailyWeather", "getCurrentLat", "getCurrentLong", "getCurrentCityName"]),
    ...mapState("weather", ["apiBase", "apiKey"])
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherData"])
  },
  mounted() {
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
  }
};
</script>

<style scoped>
.weather-daily__title {
  margin: 50px auto 20px auto;
}
</style>
