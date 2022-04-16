<template>
  <div class="weather-daily container overflow-hidden">
    <h2 class="weather-daily__title">Прогноз погоды на неделю</h2>
    <div class="weather-daily__cards row g-3">
      
        <ItemDailyWeather :day="day" v-for="day in dailyWeather" :key="day.id" />
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ItemDailyWeather from "./ItemDailyWeather.vue";

export default {
  name: "WeatherFor10days",
  components: {
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
