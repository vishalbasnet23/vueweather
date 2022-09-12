import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
export const useCitiesStore = defineStore("cities", () => {
  const queryTimeOut = ref(null);
  const searchError = ref(null);
  const searchResults = ref([]);
  function getCityDropDown(searchKeyWord) {
    clearTimeout(queryTimeOut.value);
    queryTimeOut.value = setTimeout(async () => {
      if (searchKeyWord.target.value !== "") {
        try {
          const data = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?key=16c1d0ff0fe74ca485b7f1ab53ca31c0&q=${searchKeyWord.target.value}&pretty=1&limit=1&no_dedupe=1`
          );
          searchResults.value = data.data.results;
          searchError.value = null;
        } catch (error) {
          searchError.value = true;
        }
        return;
      }
      searchResults.value = null;
    }, 300);
  }
  const cityData = computed(() => {
    const testData = searchResults.value.map((city) => {
      const newObj = {
        formatted: city.formatted,
        state: city.components.state_code
          ? city.components.state_code
          : city.components.country_code,
        city: city.components.city
          ? city.components.city.replace(" ", "-").toLowerCase()
          : city.components.state.replace(" ", "-").toLowerCase(),
        latitude: city.geometry.lat,
        longitude: city.geometry.lng,
      };
      return newObj;
    });
    return testData;
  });
  return { getCityDropDown, searchError, searchResults, cityData };
});
