<template>
  <div class="day-length">
    <h2 class="day-length__title">Световой день</h2>
    <div class="day-length__body">
      <div
        class="day-length__sun d-flex align-items-center justify-content-center"
      >
        <SunriseIcon size="1.1x"></SunriseIcon>
        <span class="day-length__time"> {{ getWeatherData.sunrise }}</span>
        <img class="day-length__img" src="../assets/sun.png" alt="sun" />
        <SunsetIcon size="1.1x"></SunsetIcon>
        <span class="day-length__time"> {{ getWeatherData.sunset }}</span>
      </div>
      <div class="day-length__length">
        <span class="day-length__time"
          ><b>Световой день</b>: {{ getWeatherData.dayLength }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { SunriseIcon, SunsetIcon } from "vue-feather-icons";

export default {
  name: "DayLenght",
  components: {
    SunriseIcon,
    SunsetIcon,
  },
  computed: {
    ...mapGetters("weather", ["getWeatherData"]),
  },
};
</script>

<style scoped>
.day-length__title {
  margin: 50px auto 20px auto;
}
.day-length__img {
  width: 30%;
}
.day-length__time {
  font-size: 18px;
  margin-left: 10px;
}
.day-length__length {
  padding-bottom: 20px;
}
</style>
