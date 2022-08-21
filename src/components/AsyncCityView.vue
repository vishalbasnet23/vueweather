<template>
  <div>CityViewAsync</div>
</template>
<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  name: "AsyncCity",
  async setup() {
    const route = useRoute();
    const TIMEZONE = "Asia/Kathmandu";
    // eslint-disable-next-line no-unused-vars
    const { lat, lon, preview } = route.query;
    const getWeatherData = () => {
      try {
        const weatherData = axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,precipitation_sum,sunrise,sunset,weathercode&timezone=${TIMEZONE}&current_weather=true`
        );
        return weatherData;
      } catch (error) {
        console.log(error);
      }
    };
    const weatherData = await getWeatherData();
    console.log(weatherData);
    return { route, weatherData };
  },
};
</script>
