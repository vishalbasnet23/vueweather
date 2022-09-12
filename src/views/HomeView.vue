<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Search"
        @input="getCityDropDown"
        v-model="searchQuery"
        class="py=2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="cityData.length > 0"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again
        </p>
        <p
          class="py-2"
          v-if="!searchError && cityData.length <= 0 && searchTriggered"
        >
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="(cityDataValue, cityDataKey) in cityData"
            :key="cityDataKey"
            class="py-2 cursor-pointer"
            @click="previewCity(cityDataValue)"
          >
            {{ cityDataValue.formatted }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";
import { useCitiesStore } from "../stores/cities";
export default {
  setup() {
    const router = useRouter();
    const searchQuery = ref("");
    const cityStore = useCitiesStore();
    cityStore.$reset();
    const { searchResults, searchError, cityData, searchTriggered } =
      storeToRefs(cityStore);
    const { getCityDropDown } = cityStore;
    function previewCity(selectedResult) {
      const [city, state] = selectedResult.formatted.split(",");
      router.push({
        name: "city",
        params: { state: state.trim(), city: city.trim() },
        query: {
          preview: "yes",
          lat: selectedResult.latitude,
          lon: selectedResult.longitude,
        },
      });
    }
    return {
      getCityDropDown,
      searchQuery,
      previewCity,
      searchResults,
      searchError,
      cityData,
      searchTriggered,
    };
  },
  components: {
    CityList,
    CityCardSkeleton,
  },
};
</script>
