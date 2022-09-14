import axios from "axios";
import { defineStore } from "pinia";
import { watch, ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const userData = ref({
    fullName: "",
    timezone: "Asia/Kathmandu",
    tempUni: "celsius",
  });
  watch(
    userData,
    (userData) => {
      localStorage.setItem("userData", JSON.stringify(userData));
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

  function saveSettings() {
    console.log(userData.value);
  }

  return { getTimeZones, userData, saveSettings };
});
