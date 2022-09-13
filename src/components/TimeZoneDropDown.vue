<template>
  <div class="md:w-100 px-3">
    <label
      class="uppercase tracking-wide text-white text-l font-bold mb-2"
      for="select-timezone"
    >
      Select Timezone
    </label>
    <select
      class="w-full bg-gray-200 border border-gray-200 text-black text-l py-3 px-4 pr-8 mb-3 rounded"
      id="select-timezone"
    >
      <option
        v-for="(timezoneVal, timezoneKey) in timezones"
        :key="timezoneKey"
      >
        {{ timezoneVal }}
      </option>
    </select>
  </div>
</template>
<script>
import { settingsStore } from "../stores/settings";
export default {
  name: "TimeZoneDropDown",

  async setup() {
    const settingsStoreObj = settingsStore();
    const { getTimeZones } = settingsStoreObj;
    const timezonesResult = await getTimeZones();
    const timezones = timezonesResult.data;
    return { timezones };
  },
};
</script>
