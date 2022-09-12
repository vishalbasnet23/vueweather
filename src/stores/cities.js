import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";
export const useCitiesStore = defineStore("cities", () => {
  const queryTimeOut = ref(null);
  const searchError = ref(null);
  const searchResults = ref([]);
  const searchTriggered = ref(false);
  function getCityDropDown(keyPressEvent) {
    clearTimeout(queryTimeOut.value);
    const searchKeyword = keyPressEvent.target.value;
    queryTimeOut.value = setTimeout(async () => {
      if (searchKeyword !== "") {
        searchTriggered.value = true;
        try {
          const data = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?key=16c1d0ff0fe74ca485b7f1ab53ca31c0&q=${searchKeyword}&pretty=1&limit=1&no_dedupe=1`
          );
          searchResults.value = data.data.results;
          searchError.value = null;
        } catch (error) {
          searchError.value = true;
        }
        return;
      }
      searchResults.value = [];
    }, 300);
  }
  const cityData = computed(() => {
    return searchResults.value.map((city) => {
      return {
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
    });
  });
  return {
    getCityDropDown,
    searchError,
    searchResults,
    cityData,
    searchTriggered,
  };
});
