import { defineStore } from "pinia";
import { ref, watch } from "vue";
import axios from "axios";
export const useWeatherStore = defineStore("weather", () => {
  const savedCities = ref([]);
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  watch(
    savedCities,
    (cities) => {
      localStorage.setItem("savedCities", JSON.stringify(cities));
    },
    { deep: true }
  );

  async function getCities() {
    const TIMEZONE = "Asia/Kathmandu";
    const requests = [];
    savedCities.value.forEach((city) => {
      if (city.city)
        requests.push(
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.cords.lat}&longitude=${city.cords.lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,precipitation_sum,sunrise,sunset,weathercode&timezone=${TIMEZONE}&current_weather=true`
          )
        );
    });
    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }

  return { savedCities, getCities };
});
