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

  function clearError() {
    if (errors.value.message.length > 0) {
      setTimeout(() => {
        errors.value.message = "";
      }, 5000);
    }
  }

  function clearSuccess() {
    if (success.value.message.length > 0) {
      setTimeout(() => {
        success.value.message = "";
      }, 5000);
    }
  }

  return {
    successMessage,
    errorMessage,
    setError,
    setSuccess,
    clearError,
    clearSuccess,
  };
});
