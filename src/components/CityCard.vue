<template>
  <div
    class="flex py-6 px-3 bg-secondary rounded-md shadow-md cursor-pointer my-2"
  >
    <div class="flex flex-col flex-1">
      <h1 class="text-3xl">{{ props.city.city }}</h1>
      <h3>{{ props.city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">
        {{ Math.round(props.city.weather.current_weather.temperature) }}&deg;
      </p>
      <div class="flex gap-2">
        <span class="text-xs">
          <p class="capitalize">{{ weatherDesc }}</p>
          <p class="text-2xl text-center">
            <i
              :class="`wi wi-wmo4680-${props.city.weather.current_weather.weathercode}`"
            ></i>
          </p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { getWeatherDesc } from "../methods/utils";
export default {
  name: "cityCard",
  props: {
    city: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const weatherDesc = computed(() => {
      return getWeatherDesc(~~props.city.weather.current_weather.weathercode);
    });
    return { props, weatherDesc };
  },
};
</script>
