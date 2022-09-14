<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-primary">
    <SiteNavigation />
    <ToastAlerts />
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in">
        <template #default>
          <component :is="Component" :key="route.path" />
        </template>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
import ToastAlerts from "./components/ToastAlerts.vue";
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
