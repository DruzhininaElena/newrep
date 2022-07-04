import Vue from "vue";
import Router from "vue-router";
import WeatherInCity from "@/components/WeatherInCity";
import DailyWeather from "@/components/DailyWeather";
import DayLenght from "@/components/DayLenght";
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
      path: "/daily",
      name: "daily",
      component: DailyWeather
    },
    {
      path: "/day-length",
      name: "day-length",
      component: DayLenght
    }

  ]
});

export default router;
