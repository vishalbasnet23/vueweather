<template>
  <Suspense>
    <AsyncCityView />
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<script>
import AsyncCityView from "../components/AsyncCityView.vue";
export default {
  setup() {
    return {};
  },
  components: { AsyncCityView },
};
</script>
