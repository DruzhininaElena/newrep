import Vue from "vue";
import Router from "vue-router";
import WeatherInCity from "../components/WeatherInCity";
import CitiesList from "../components/CitiesList.vue"
Vue.use(Router);


const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "weatherInCity",
      component: WeatherInCity
    }, 
    {
      path: "/cities",
      name: "citiesList",
      component: CitiesList
    }
  ]
});

export default router;