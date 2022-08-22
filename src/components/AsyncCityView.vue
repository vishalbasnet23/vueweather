<template>
  <div class="flex flex-col items-center">
    <div
      v-if="preview === 'yes'"
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
              }}&deg -
              {{
                Math.round(weatherData.data.daily.temperature_2m_max[timeKey])
              }}&deg
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  name: "AsyncCity",
  async setup() {
    const route = useRoute();
    const TIMEZONE = "Asia/Kathmandu";
    const { lat, lon, preview } = route.query;
    const { city, state } = route.params;
    const getWeatherDesc = (code) => {
      switch (true) {
        case code === 0:
          return "Clear Sky";
        case code === 1:
          return "Mainly Clear";
        case code === 2:
          return "Partly Cloudy";
        case code === 3:
          return "Overcast";
        case code === 45:
          return "Fog";
        case code === 48:
          return "Depositing rime fog";
        case code === 51:
          return "Light Drizzle";
        case code === 53:
          return "Moderate Drizzle";
        case code === 55:
          return "Dense Drizzle";
        case code === 56:
          return "Light Freezing Drizzle";
        case code === 57:
          return "Dense Freezing Drizzle";
        case code === 61:
          return "Slight Rain";
        case code === 63:
          return "Moderate Rain";
        case code === 65:
          return "Heavy Rain";
        case code === 66:
          return "Freezing Light Rain";
        case code === 67:
          return "Freezing Heavy Rain";
        case code === 71:
          return "Slight Snow fall";
        case code === 73:
          return "Moderate Snow fall";
        case code === 75:
          return "Heavy Snow fall";
        case code === 77:
          return "Snow grains";
        case code === 80:
          return "Slight Rain Showers";
        case code === 81:
          return "Moderate Rain Showers";
        case code === 82:
          return "Violent Rain Showers";
        case code === 85:
          return "Light Snow Showers";
        case code === 86:
          return "Heavy Snow Showers";
        case code === 95:
          return "Thunderstorm";
        case code === 96:
          return "Thunderstorm with slight hail";
        case code === 99:
          return "Thunderstorm with heavy hail";
        default:
          return "Not Available";
      }
    };
    const getWeatherData = () => {
      try {
        const weatherData = axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,rain_sum,showers_sum,precipitation_sum,sunrise,sunset,weathercode&timezone=${TIMEZONE}&current_weather=true`
        );
        return weatherData;
      } catch (error) {
        console.log(error);
      }
    };
    const weatherData = await getWeatherData();
    const weatherCode = computed(() => {
      return weatherData.data.current_weather.weathercode;
    });
    const weatherDesc = computed(() => {
      return getWeatherDesc(~~weatherData.data.current_weather.weathercode);
    });

    return {
      weatherData,
      preview,
      city,
      state,
      weatherCode,
      weatherDesc,
    };
  },
};
</script>
