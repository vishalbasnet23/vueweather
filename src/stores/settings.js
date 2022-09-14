import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const userData = ref({
    fullName: "",
    timezone: "Asia/Kathmandu",
    tempUni: "celsius",
    firstTime: true,
  });

  if (localStorage.getItem("userData")) {
    userData.value = JSON.parse(localStorage.getItem("userData"));
  }

  function getTimeZones() {
    try {
      const timezoneResult = axios.get(`http://worldtimeapi.org/api/timezone`);
      return timezoneResult;
    } catch (error) {
      console.log(error);
    }
  }

  function saveSettings() {
    userData.value.firstTime = false;
    localStorage.setItem("userData", JSON.stringify(userData.value));
  }

  const isFirstTime = computed(() => userData.value.firstTime);

  return { getTimeZones, userData, saveSettings, isFirstTime };
});
