import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useCitiesStore = defineStore("cities", () => {
  const queryTimeOut = ref(null);
  const searchError = ref(null);
  const searchResults = ref([]);
  function getCityDropDown(searchKeyWord) {
    clearTimeout(queryTimeOut.value);
    queryTimeOut.value = setTimeout(async () => {
      if (searchKeyWord !== "") {
        try {
          const data = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?key=16c1d0ff0fe74ca485b7f1ab53ca31c0&q=${searchKeyWord}&pretty=1&limit=1&no_dedupe=1`
          );
          searchResults.value = data.results;
          searchError.value = null;
        } catch (error) {
          searchError.value = true;
        }
        return;
      }
      searchResults.value = null;
    }, 300);
  }
  return { getCityDropDown, searchError, searchResults };
});
