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
import { useRouter } from "vue-router";
import CityCard from "./CityCard.vue";
import { useWeatherStore } from "../stores/weather";
export default {
  name: "CityList",
  async setup() {
    const { getCities, savedCities } = useWeatherStore()
    const router = useRouter();
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
