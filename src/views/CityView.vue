<template>
  <Suspense>
    <AsyncCityView />
    <template #fallback>
      <CityViewSkeleton />
    </template>
  </Suspense>
</template>

<script>
import AsyncCityView from "../components/AsyncCityView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
export default {
  setup() {
    return {};
  },
  components: { AsyncCityView, CityViewSkeleton },
};
</script>
