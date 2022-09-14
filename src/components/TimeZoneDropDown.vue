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
      :value="modelValue"
      @change="updateValue"
    >
      <option
        v-for="(timezoneVal, timezoneKey) in timezones"
        :about="timezoneVal"
        :key="timezoneKey"
      >
        {{ timezoneVal }}
      </option>
    </select>
  </div>
</template>
<script>
import { useSettingsStore } from "../stores/settings";
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  name: "TimeZoneDropDown",
  async setup(props, context) {
    const settingsStore = useSettingsStore();
    const { getTimeZones } = settingsStore;
    const timezonesResult = await getTimeZones();
    const timezones = timezonesResult.data;
    const updateValue = (event) => {
      context.emit("update:modelValue", event.target.value);
    };
    return { timezones, updateValue };
  },
};
</script>
