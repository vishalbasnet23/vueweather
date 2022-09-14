import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settings", () => {
  const userData = ref({
    fullName: "",
    timezone: "Asia/Kathmandu",
    tempUni: "celsius",
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
    localStorage.setItem("userData", JSON.stringify(userData.value));
  }

  return { getTimeZones, userData, saveSettings };
});
