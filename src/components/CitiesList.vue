<template>
  <div class="cities-list container">
    <h1>{{ getCurrentRegion }}</h1>
    <h5>Текущие дата и время: {{ time }}</h5>
    <b-list-group>
      <b-list-group-item
        @click="setNewDataWeather"
        class="cities-list__item flex-column align-items-start"
        v-for="city in getWeatherInCitiesOfRegion"
        :key="city.population"
      >
        <div class="item w-100 row">
          <div class="item__main col-md-6 d-flex align-items-center">
            <a href="#" @click="setNewDataWeather">{{ city.city }}</a>
            <img class="item__icon" :src="city.icon" alt="icon" />
            <span class="weather-in-city__temp">{{ city.temp }}</span>
          </div>
          <div
            class="item__info col-md-6 d-flex align-items-center justify-content-between flex-wrap"
          >
            <div class="d-flex align-items-center">
              <WindIcon size="1.1x"></WindIcon>
              <span class="item__value"
                >{{ city.windSpeed }} {{ city.windDirection }}</span
              >
            </div>
            <div class="d-flex align-items-center">
              <CloudIcon size="1.1x"></CloudIcon>
              <span class="item__value">{{ city.clouds }}%</span>
            </div>
            <div class="d-flex align-items-center">
              <DropletIcon size="1.1x"></DropletIcon>
              <span class="item__value">{{ city.humidity }}%</span>
            </div>
            <div class="d-flex align-items-center">
              <ArrowDownCircleIcon size="1.1x"></ArrowDownCircleIcon>
              <span class="item__value">{{ city.pressure }}</span>
            </div>
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  CloudIcon,
  WindIcon,
  DropletIcon,
  ArrowDownCircleIcon,
} from "vue-feather-icons";

export default {
  name: "WeatherInCity",
  components: {
    CloudIcon,
    WindIcon,
    DropletIcon,
    ArrowDownCircleIcon,
  },
  data: () => ({
    time: new Date().toLocaleString(),
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: "fdac93ce7e28f93543a70e9873a523cb",
  }),
  computed: {
    ...mapGetters("weather", [
      "getCurrentRegion",
      "getWeatherInCitiesOfRegion",
      "getCitiesOfCurrentRegion",
    ]),
  },
  methods: {
    ...mapActions("weather", ["fetchWeatherData"]),
    setNewDataWeather(e) {
      let targetCity = e.target.innerHTML;

      let targetCityInfo = this.getCitiesOfCurrentRegion.filter(
        (city) => city.name === targetCity
      );

      let latOfTargetCity = targetCityInfo[0].coords.lat;
      let lonOfTargetCity = targetCityInfo[0].coords.lon;

      this.fetchWeatherData({
        url: `${this.apiBase}weather?q=${targetCity}&units=metric&APPID=${this.apiKey}&units=metric&lang=ru`,
        mutation: "SET_WEATHER_DATA",
      });
      this.fetchWeatherData({
        url: `${this.apiBase}onecall?&lat=${latOfTargetCity}&lon=${lonOfTargetCity}&exclude=hourly,alerts,minutely&APPID=${this.apiKey}&units=metric&lang=ru`,
        mutation: "SET_DAILY_WEATHER_DATA",
      });
      
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
.cities-list__item {
  margin-bottom: 10px;
}
.item__icon {
  height: 40px;
  width: 40px;
}
.item__value {
  margin: 0 10px;
}
@media (max-width: 767px) {
  .item__info {
    display: block;
  }
}
a {
  font-size: 24px;
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: gray;
}
</style>
