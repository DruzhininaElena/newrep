<template>
  <div id="app">
    <NavMenu />
    <router-view></router-view>
    <!-- <WeatherInCity />
    <CitiesList /> -->
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";
// import WeatherInCity from "./components/WeatherInCity.vue";
// import CitiesList from "./components/CitiesList.vue"
 
import { mapActions } from 'vuex'

export default {
  name: "App",
  components: {
    NavMenu,
    // WeatherInCity,
    // CitiesList,
  },
  data: () => ({
  
  }),
  computed: {
  },
  methods: {
    ...mapActions('weather', ['getCurrentGeolocation']),
    
  },
  created() {
    this.getCurrentGeolocation();
  }
  
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background-color: rgba(211, 211, 211, 0.5);
  min-height: 100vh;
}
</style>
