import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useAlertStore } from "./alerts";

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
      const timezoneResult = axios.get(
        `https://api.timezonedb.com/v2.1/list-time-zone?key=2JB3DINZL706&format=json`
      );
      return timezoneResult;
    } catch (error) {
      console.log(error);
    }
  }

  function saveSettings() {
    userData.value.firstTime = false;
    localStorage.setItem("userData", JSON.stringify(userData.value));
    const alertStore = useAlertStore();
    const { setSuccess } = alertStore;
    setSuccess("Settings saved");
  }

  const isFirstTime = computed(() => userData.value.firstTime);

  return { getTimeZones, userData, saveSettings, isFirstTime };
});
