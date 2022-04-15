<template>
  <div class="cities-list container">
    <h1>{{ getCurrentRegion }}</h1>
    <h5>Текущие дата и время: {{ time }}</h5>
    <b-list-group>
      <CitiesItem
        :city="city"
        v-for="city in getWeatherInCitiesOfRegion"
        :key="city.population"
      />
    </b-list-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CitiesItem from "./CitiesItem.vue";

export default {
  name: "WeatherInCity",
  components: {
    CitiesItem,
  },
  data: () => ({
    time: new Date().toLocaleString(),
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: "fdac93ce7e28f93543a70e9873a523cb",
  }),
  computed: {
    ...mapGetters("weather", [
      "getWeatherInCitiesOfRegion",
      "getCurrentRegion",
    ]),
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
