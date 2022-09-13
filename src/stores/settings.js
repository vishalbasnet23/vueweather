import axios from "axios";
import { defineStore } from "pinia";
import { watch, ref } from "vue";

export const settingsStore = defineStore("settings", () => {
  const settings = ref({
    fullName: "",
    timezone: "",
    tempUni: "",
  });
  watch(
    settings,
    (settings) => {
      localStorage.setItem("settings", JSON.stringify(settings));
    },
    { deep: true }
  );

  function getTimeZones() {
    try {
      const timezoneResult = axios.get(`http://worldtimeapi.org/api/timezone`);
      return timezoneResult;
    } catch (error) {
      console.log(error);
    }
  }

  return { getTimeZones, settings };
});
