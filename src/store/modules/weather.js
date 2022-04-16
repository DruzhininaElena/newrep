import axios from "axios";
import citiesInfo from "../citiesData/cities";

const weatherStore = {
  namespaced: true,
  state: {
    currentLat: "",
    currentLong: "",
    apiBase: "https://api.openweathermap.org/data/2.5/",
    apiKey: "fdac93ce7e28f93543a70e9873a523cb",
    weatherData: {},
    dailyweatherData: [],
    isError: false,
    currentRegion: JSON.parse(localStorage.getItem("region")) || "",
    citiesOfCurrentRegion: "",
    weatherInCitiesOfRegion: JSON.parse(localStorage.getItem("city")) || [],
  },
  getters: {
    getWeatherData({ weatherData }) {
      return weatherData;
    },
    dailyWeather({ dailyweatherData }) {
      return dailyweatherData;
    },
    currentRegion({ currentRegion }) {
      return currentRegion;
    },
    getWeatherInCitiesOfRegion({ weatherInCitiesOfRegion }) {
      return weatherInCitiesOfRegion;
    },
    getCitiesOfCurrentRegion({ citiesOfCurrentRegion }) {
      return citiesOfCurrentRegion;
    },
  },
  mutations: {
    SET_CURRENT_GEOLOCATION(state, coords) {
      state.currentLat = coords.latitude;
      state.currentLong = coords.longitude;
    },
    SET_WEATHER_DATA(state, data) {
      state.weatherData = serializeResponseCurrentWeather(data);
    },
    SET_ERROR(state, value) {
      state.isError = value;
    },
    SET_DAILY_WEATHER_DATA(state, data) {
      state.dailyweatherData = serializeResponseDailyWeather(data);
    },
    SET_CURRENT_REGION(state, region) {
      state.currentRegion = region;
      console.log(state.currentRegion);
      localStorage.setItem("region", JSON.stringify(region))
    },
    SET_CITIES_OF_CURRENT_REGION(state, cities) {
      state.citiesOfCurrentRegion = cities;
      console.log(state.citiesOfCurrentRegion);
    },
    SET_WEATHER_DATA_IN_CITIES_OF_REGION(state, data) {
      state.weatherInCitiesOfRegion.push(serializeResponseCurrentWeather(data));
      console.log(state.weatherInCitiesOfRegion);
      localStorage.setItem("city", JSON.stringify(state.weatherInCitiesOfRegion))
    },
  },
  actions: {
    getCurrentGeolocation({ commit, dispatch, state }) {
      navigator.geolocation.getCurrentPosition(success, error);

      function success(position) {
        let coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        commit("SET_CURRENT_GEOLOCATION", coords);
        dispatch("fetchWeatherData", {
          url: `${state.apiBase}weather`,
          params: {
            params: {
              lat: state.currentLat,
              lon: state.currentLong,
              units: "metric",
              APPID: state.apiKey,
              lang: "ru",
            },
          },
          mutation: "SET_WEATHER_DATA",
        });
        dispatch("fetchWeatherData", {
          url: `${state.apiBase}onecall`,
          params: {
            params: {
              lat: state.currentLat,
              lon: state.currentLong,
              exclude: "hourly,alerts,minutely",
              units: "metric",
              APPID: state.apiKey,
              lang: "ru",
            },
          },
          mutation: "SET_DAILY_WEATHER_DATA",
        });
      }

      function error(error) {
        console.log(error);
        alert("не уалось получить текущие координаты");
        commit("SET_CURRENT_GEOLOCATION", { latitude: 0, longitude: 0 });
        dispatch("fetchWeatherData", {
          url: `${state.apiBase}weather`,
          params: {
            params: {
              lat: 0,
              lon: 0,
              units: "metric",
              APPID: state.apiKey,
              lang: "ru",
            },
          },
          mutation: "SET_WEATHER_DATA",
        });
        dispatch("fetchWeatherData", {
          url: `${state.apiBase}onecall`,
          params: {
            params: {
              lat: 0,
              lon: 0,
              exclude: "hourly,alerts,minutely",
              units: "metric",
              APPID: state.apiKey,
              lang: "ru",
            },
          },
          mutation: "SET_DAILY_WEATHER_DATA",
        });
      }
    },
    async fetchWeatherData({ commit }, { url, params, mutation }) {
      try {
        const response = await axios.get(url, params);
        commit(mutation, response.data);
        commit("SET_ERROR", false);
      } catch (error) {
        console.log(error);
        commit("SET_ERROR", true);
        commit(mutation, {});
      }
    },
    getCurrentRegion({ commit, state, dispatch }) {
      if (state.weatherInCitiesOfRegion.length) return;
      let currentCityName = state.weatherData.city;
      let currentCityInfo = citiesInfo.filter(
        (city) => city.name === currentCityName
      );
      let currentRegion = currentCityInfo[0].subject;
      
      commit("SET_CURRENT_REGION", currentRegion);
      let citiesOfCurrentRegion = citiesInfo.filter(
        (city) => city.subject === currentRegion
      );
      commit("SET_CITIES_OF_CURRENT_REGION", citiesOfCurrentRegion);
      citiesOfCurrentRegion.forEach((city) => {
        dispatch("fetchWeatherData", {
          url: `${state.apiBase}weather`,
          params: {
            params: {
              q: city.name,
              units: "metric",
              APPID: state.apiKey,
              lang: "ru",
            },
          },
          mutation: "SET_WEATHER_DATA_IN_CITIES_OF_REGION",
        });
      });
      console.log(state.weatherInCitiesOfRegion)
      
    },
  },
};

export default weatherStore;

function getWindDirection(deg) {
  let direction = "";
  if (deg >= 367.5 || (deg >= 0 && deg < 22.5)) {
    direction = "С";
  } else if (deg >= 22.5 && deg < 67.5) {
    direction = "СВ";
  } else if (deg >= 67.5 && deg < 112.5) {
    direction = "В";
  } else if (deg >= 112.5 && deg < 157.5) {
    direction = "ЮВ";
  } else if (deg >= 157.5 && deg < 202.5) {
    direction = "Ю";
  } else if (deg >= 202.5 && deg < 247.5) {
    direction = "ЮЗ";
  } else if (deg >= 247.5 && deg < 292.5) {
    direction = "З";
  } else if (deg >= 292.5 && deg < 367.5) {
    direction = "СЗ";
  }

  return direction;
}

function dateConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "фвг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  let month = months[a.getMonth()];
  let days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  let dayOfTheWeek = a.getDay();
  let number = a.getDate();
  let date = `${number} ${month} ${days[dayOfTheWeek]}`;
  return date;
}

function timeConverter(UNIX_timestamp) {
  let a = new Date(UNIX_timestamp * 1000);
  let hour = a.getHours();
  let min = a.getMinutes();
  if (String(min).length === 1) {
    min = 0 + String(a.getMinutes());
  }
  if (String(hour).length === 1) {
    hour = "0" + a.getHours();
  }
  let time = `${hour}:${min}`;
  return time;
}

function calculateDayLength(sunrise, sunset) {
  let arraySunrise = sunrise.split(":");
  let arraySunset = sunset.split(":");
  let resultInMinuts =
    Number(arraySunset[0]) * 60 +
    Number(arraySunset[1]) -
    (Number(arraySunrise[0]) * 60 + Number(arraySunrise[1]));
  let hours = Math.floor(resultInMinuts / 60);
  let min = resultInMinuts % 60;
  if (String(min).length === 1) {
    min = "0" + (resultInMinuts % 60);
  }
  let result = `${hours} ч ${min} мин`;
  return result;
}

function serializeResponseCurrentWeather(data) {
  const newWeatherData = {
    city: data.name,
    temp: `${Math.round(data.main.temp)}°`,
    icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    windSpeed: `${data.wind.speed.toFixed(1)} м/с`,
    windDirection: getWindDirection(data.wind.deg),
    humidity: data.main.humidity,
    clouds: data.clouds.all,
    pressure: `${Math.round(data.main.pressure / 1.33317)} мм.рт.ст`,
    sunrise: timeConverter(data.sys.sunrise),
    sunset: timeConverter(data.sys.sunset),
    dayLength: calculateDayLength(
      timeConverter(data.sys.sunrise),
      timeConverter(data.sys.sunset)
    ),
    lat: data.coord.lat,
    lon: data.coord.lon,
    id: weatherStore.state.weatherInCitiesOfRegion.length + 1,
  };
  return newWeatherData;
}

function serializeResponseDailyWeather(data) {
  let newArray = data.daily.map((day) => ({
    dt: dateConverter(day.dt),
    temp: `${Math.round(day.temp.day)}°`,
    humidity: `${day.humidity}%`,
    icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`,
    id: Math.random(),
  }));
  return newArray;
}
