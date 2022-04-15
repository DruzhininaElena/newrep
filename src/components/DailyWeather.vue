<template>
  <div class="weather-daily container overflow-hidden">
    <h2 class="weather-daily__title">Прогноз погоды на неделю</h2>
    <div class="weather-daily__cards row g-3">
      
        <ItemDailyWeather :day="day" v-for="day in dailyWeather" :key="day.id" />
      
    </div>
    <!-- <div class="weather-daily__cards row g-3" > -->
      <!-- <div class="col-md-3 col-sm-6" v-for="day in dailyWeather" :key="day.id">
        <div class="border rounded bg-white">
          <div class="weather-daily__date">{{ day.dt }}</div>
          <div class="d-flex justify-content-center align-items-center">
            <div class="weather-daily__temp">{{ day.temp }}</div>
            <img class="weather-daily__icon" :src="day.icon" alt="icon" />
          </div>
          <div
            class="weather-daily__humidity d-flex justify-content-center align-items-center"
          >
            <CloudIcon size="1.1x"></CloudIcon>
            <div class="weather-daily__humidity-value">{{ day.humidity }}</div>
          </div>
        </div>
      </div> -->
      
    <!-- </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import { CloudIcon } from "vue-feather-icons";
import ItemDailyWeather from "./ItemDailyWeather.vue";

export default {
  name: "WeatherFor10days",
  components: {
    // CloudIcon,
    ItemDailyWeather
  },
  data: () => ({}),
  computed: {
    ...mapGetters("weather", ["dailyWeather"]),
  },
};
</script>

<style scoped>
.weather-daily__title {
  margin: 50px auto 20px auto;
}
</style>
