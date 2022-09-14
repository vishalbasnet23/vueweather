<template>
  <Teleport to="body">
    <Transition>
      <button
        type="button"
        @click="closeToast()"
        v-show="toastOpen"
        :class="`fixed bottom-4 right-4 z-50 rounded-md bg-${props.type}-500 px-4 py-2 text-white transition hover:bg-${props.type}-600`"
      >
        <div class="flex items-center space-x-2">
          <span class="text-xl"><i class="fa fa-check"></i></span>
          <p class="font-normal">{{ props.message }}</p>
        </div>
      </button>
    </Transition>
  </Teleport>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    message: {
      type: String,
      default: "Successful",
    },
    type: {
      type: String,
      default: "red",
    },
  },
  setup(props) {
    const toastOpen = ref(false);
    function closeToast() {
      toastOpen.value = false;
    }
    function openToast() {
      toastOpen.value = true;
    }
    return { toastOpen, closeToast, openToast, props };
  },
};
</script>
<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
