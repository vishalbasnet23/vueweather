<template>
  <div
    v-show="modalActive"
    class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
  >
    <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-sm">
      <slot />
      <button
        class="text-white mt-8 bg-primary py-2 px-6"
        @click="$emit('close-modal')"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    console.log(props);
  },
};
</script>
