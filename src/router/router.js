import Vue from "vue";
import Router from "vue-router";
import WeatherInCity from "../components/WeatherInCity";
import CitiesList from "../components/CitiesList";
import Login from "../components/Login";
import Register from "../components/Register";
import FavouriteCities from "../components/FavouriteCities"
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
    },
    {
      path: "/autorization",
      name: "autorization",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Register
    },
    {
      path: "/favourite",
      name: "favourite",
      component: FavouriteCities
    }
  ]
});

export default router;