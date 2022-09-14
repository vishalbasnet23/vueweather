<template>
  <div class="flex flex-col items-center">
    <div
      v-if="!isAlreadySaved"
      class="text-white p-4 bg-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city
      </p>
    </div>
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.data.current_weather.time).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(weatherData.data.current_weather.time).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.data.current_weather.temperature) }}&deg;
      </p>
      <div class="text-center">
        <p class="capitalize">{{ weatherDesc }}</p>
        <p class="text-8xl">
          <i :class="`wi wi-wmo4680-${weatherCode}`"></i>
        </p>
      </div>
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Next 6 days</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="(timeData, timeKey) in weatherData.data.daily.time"
            :key="timeKey"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(timeData).toLocaleDateString("en-us", {
                  weekday: "short",
                  day: "2-digit",
                  month: "long",
                })
              }}
            </p>
            <p class="text-2xl">
              <i
                :class="`wi wi-wmo4680-${weatherData.data.daily.weathercode[timeKey]}`"
              ></i>
            </p>
            <p class="text">
              {{
                Math.round(weatherData.data.daily.temperature_2m_min[timeKey])
              }}&deg; -
              {{
                Math.round(weatherData.data.daily.temperature_2m_max[timeKey])
              }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
      v-if="isAlreadySaved"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getWeatherDesc } from "../methods/utils.js";
import { useWeatherStore } from "../stores/weather";
import { useAlertStore } from "../stores/alerts";
export default {
  name: "AsyncCity",
  async setup() {
    const route = useRoute();
    const weatherStore = useWeatherStore();
    const { isAlreadySaved } = storeToRefs(weatherStore);
    const { getWeatherData, removeCity } = weatherStore;
    const { lat, lon } = route.query;
    const { city, state } = route.params;
    try {
      const weatherData = await getWeatherData(lat, lon);
      const weatherCode = computed(() => {
        return weatherData.data.current_weather.weathercode;
      });
      const weatherDesc = computed(() => {
        return getWeatherDesc(~~weatherData.data.current_weather.weathercode);
      });
      return {
        weatherData,
        route,
        city,
        state,
        weatherCode,
        weatherDesc,
        removeCity,
        isAlreadySaved,
      };
    } catch (error) {
      const alertStore = useAlertStore();
      const { setError } = alertStore;
      setError(error.message);
      return {
        route,
        city,
        state,
        removeCity,
        isAlreadySaved,
      };
    }
  },
};
</script>
