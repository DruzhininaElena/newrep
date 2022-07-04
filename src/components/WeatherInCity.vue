<template>
  <div class="weather-in-city container">
    <div class="weather-in-city__card card">
      <div class="weather-in-city__body card-body">
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "WeatherInCity",
  components: {
  },
  data: () => ({
    time: new Date().toLocaleString()
  }),
  computed: {
    ...mapGetters("weather", ["getWeatherData"])
  }
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
@media (max-width: 576px) {
  .weather-in-city__favourite-btn {
    width: 65px;
    font-size: 8px;
  }
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
