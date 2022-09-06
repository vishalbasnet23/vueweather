<template>
  <div>
    <ul v-for="city in savedCities" :key="city.id">
      <CityCard :city="city" @click="goToCityView(city)" />
    </ul>
    <p v-if="savedCities.length <= 0">
      No cities added. To start tracking a location, search in the fields above.
    </p>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
export default {
  name: "CityList",
  async setup() {
    const savedCities = ref([]);
    const router = useRouter();
    const localStorageSavedCities = localStorage.getItem("savedCities");
    const getCities = async () => {
      const TIMEZONE = "Asia/Kathmandu";
      if (localStorageSavedCities) {
        savedCities.value = JSON.parse(localStorageSavedCities);
      }
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
    };
    await getCities();
    const goToCityView = (cityObj) => {
      router.push({
        name: "city",
        query: {
          lat: cityObj.cords.lat,
          lon: cityObj.cords.lon,
          id: cityObj.id,
        },
        params: {
          state: cityObj.state,
          city: cityObj.city,
        },
      });
    };
    return { savedCities, getCities, goToCityView };
  },
  components: { CityCard },
};
</script>
