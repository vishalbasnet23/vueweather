<template>
  <div class="flex py-6 px-3 bg-secondary rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-2">
      <AnimatedPlaceHolder class="max-w-[50%]" />
      <AnimatedPlaceHolder class="max-w-[40%]" />
    </div>
    <div class="flex flex-col items-end flex-1 gap-2">
      <AnimatedPlaceHolder class="max-w-[50px] w-full" />
      <AnimatedPlaceHolder class="max-w-[75px] w-full" />
    </div>
  </div>
</template>

<script>
import AnimatedPlaceHolder from "./AnimatedPlaceHolder.vue";
export default {
  name: "CityCardSkeleton",
  setup() {},
  components: { AnimatedPlaceHolder },
};
</script>
