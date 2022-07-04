<template>
  <div class="col-md-3 col-sm-6">
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
  </div>
</template>

<script>
import { CloudIcon } from "vue-feather-icons";

export default {
  name: "ItemDailyWeather",
  components: {
    CloudIcon,
  },
  props: {
    day: Object,
  },
};
</script>

<style scoped>
.weather-daily__date {
  text-decoration-line: underline;
  font-size: 1.25rem;
}
.weather-daily__icon {
  height: 100px;
  width: 100px;
}
.weather-daily__temp {
  font-size: 40px;
}
.weather-daily__humidity-value {
  margin-left: 10px;
}
</style>
