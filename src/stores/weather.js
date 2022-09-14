import { defineStore, storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { getUid } from "../methods/utils";
import { useSettingsStore } from "./settings";
export const useWeatherStore = defineStore("weather", () => {
  const savedCities = ref([]);
  const router = useRouter();
  const route = useRoute();
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
    const requests = [];
    const userDataStore = useSettingsStore();
    const { userData } = storeToRefs(userDataStore);
    const { timezone, tempUni } = userData.value;
    savedCities.value.forEach((city) => {
      if (city.city)
        requests.push(
          axios.get(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.cords.lat}&longitude=${city.cords.lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,precipitation_sum,sunrise,sunset,weathercode&timezone=${timezone}&current_weather=true&temperature_unit=${tempUni}`
          )
        );
    });
    const weatherData = await Promise.all(requests);
    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }

  function getWeatherData(latitude, longitude) {
    try {
      const userDataStore = useSettingsStore();
      const { userData } = storeToRefs(userDataStore);
      const { timezone, tempUni } = userData.value;
      const weatherData = axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,precipitation_sum,sunrise,sunset,weathercode&timezone=${timezone}&current_weather=true&temperature_unit=${tempUni}`
      );
      return weatherData;
    } catch (error) {
      console.log(error);
    }
  }

  function addCity() {
    if (isAlreadySaved.value || route.name !== "city") {
      return false;
    }
    const uniqueId = getUid(route.query.lat, route.query.lon);
    const locationObj = {
      id: uniqueId,
      state: route.params.state,
      city: route.params.city,
      cords: {
        lat: route.query.lat,
        lon: route.query.lon,
      },
    };
    savedCities.value.push(locationObj);
    route.query.id = uniqueId;
    let query = Object.assign({}, route.query);
    delete query.preview;
    router.replace({ query });
  }

  const isAlreadySaved = computed(() => {
    const routeId = getUid(route.query.lat, route.query.lon);
    const found = savedCities.value.find((city) => city.id === routeId);
    return found ? true : false;
  });

  function removeCity() {
    const updatedCities = savedCities.value.filter(
      (city) => city.id !== route.query.id
    );
    savedCities.value = updatedCities;
    router.push({
      name: "home",
    });
  }

  return {
    savedCities,
    getCities,
    getWeatherData,
    addCity,
    isAlreadySaved,
    removeCity,
  };
});
