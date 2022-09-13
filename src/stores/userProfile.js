import { defineStore } from "pinia";
import { watch, ref } from "vue";

export const useUserProfileStore = defineStore(() => {
  const userProfile = ref({});
  watch(
    userProfile,
    (user) => {
      localStorage.setItem("userProfile", JSON.stringify(user));
    },
    { deep: true }
  );
});
