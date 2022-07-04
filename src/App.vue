<template>
  <div id="app">
    <NavMenu />
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue";

import { mapActions } from "vuex";

export default {
  name: "App",
  components: {
    NavMenu,
  },
  data: () => ({}),
  computed: {},
  methods: {
    ...mapActions("weather", ["getCurrentGeolocation", "getCurrentRegion"]),
  },
  mounted() {
    this.getCurrentGeolocation();
    this.getCurrentRegion();
  },
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
