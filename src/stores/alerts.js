import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAlertStore = defineStore("alertStore", () => {
  const errors = ref({
    message: "",
  });
  const success = ref({
    message: "",
  });
  const errorMessage = computed(() => {
    return errors.value.message;
  });
  const successMessage = computed(() => {
    return success.value.message;
  });

  function setError(errorMsg) {
    errors.value.message = errorMsg;
  }

  function setSuccess(successMsg) {
    success.value.message = successMsg;
  }

  return { successMessage, errorMessage, setError, setSuccess };
});
