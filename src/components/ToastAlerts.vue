<template>
  <Teleport to="body">
    <Transition>
      <button
        type="button"
        @click="closeToast()"
        v-show="toastOpen"
        :class="`fixed bottom-4 right-4 z-50 rounded-md bg-${type}-500 px-4 py-2 text-white transition hover:bg-${type}-600`"
      >
        <div class="flex items-center space-x-2">
          <span class="text-xl"><i class="fa fa-check"></i></span>
          <p class="font-normal">{{ message }}</p>
        </div>
      </button>
    </Transition>
  </Teleport>
</template>
<script>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import { useAlertStore } from "../stores/alerts";
export default {
  setup() {
    const toastOpen = ref(false);
    const type = ref("green");
    const message = ref("");
    const alertStore = useAlertStore();
    const { errorMessage, successMessage } = storeToRefs(alertStore);
    const { clearError, clearSuccess } = alertStore;

    watch(errorMessage, () => {
      if (errorMessage.value.length > 0) {
        toastOpen.value = true;
        type.value = "red";
        message.value = errorMessage.value;
        clearError();
        setTimeout(() => {
          toastOpen.value = false;
        }, 5000);
      }
    });

    watch(successMessage, () => {
      if (successMessage.value.length > 0) {
        toastOpen.value = true;
        type.value = "green";
        message.value = successMessage.value;
        clearSuccess();
        setTimeout(() => {
          toastOpen.value = false;
        }, 5000);
      }
    });

    function closeToast() {
      toastOpen.value = false;
      clearError();
      clearSuccess();
    }
    return { toastOpen, closeToast, type, message };
  },
};
</script>
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
