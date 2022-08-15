<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <Routerlink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Local Weather</p>
        </div>
      </Routerlink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-secondary duration-150 cursor-pointer"
        />
        <i
          class="fa-solid fa-plus text-xl hover:text-secondary duration-150 cursor-pointer"
        />
      </div>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  setup() {
    return {};
  },
};
</script>
