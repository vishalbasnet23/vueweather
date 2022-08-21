<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        placeholder="Search"
        @input="getSearchResults"
        v-model="searchQuery"
        class="py=2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="searchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again
        </p>
        <p class="py-2" v-if="!searchError && searchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="(searchResultValue, searchResultKey) in searchResults"
            :key="searchResultKey"
            class="py-2 cursor-pointer"
          >
            {{ searchResultValue }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
export default {
  setup() {
    const searchQuery = ref("");
    const searchResults = ref(null);
    const queryTimeOut = ref(null);
    const searchError = ref(null);
    function getSearchResults() {
      clearTimeout(queryTimeOut.value);
      queryTimeOut.value = setTimeout(async () => {
        if (searchQuery.value !== "") {
          try {
            const result = await axios.get(
              `http://api.positionstack.com/v1/forward?access_key=71c87c2d5233412bc09bd8e2b61c8e8e&query=${searchQuery.value}&fields=results.label`
            );
            const allLabels = result.data.data.map((obj) => obj.label);
            searchResults.value = [...new Set(allLabels)];
            searchError.value = null;
          } catch (error) {
            searchError.value = true;
          }
          return;
        }
        searchResults.value = null;
      }, 300);
    }
    return { getSearchResults, searchQuery, searchResults, searchError };
  },
};
</script>
