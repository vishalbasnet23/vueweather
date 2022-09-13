<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <form>
        <div class="-mx-3 flex flex-col mb-6">
          <div class="md:w-100 px-3 mb-6 md:mb-0">
            <label
              class="uppercase tracking-wide text-white text-l font-bold mb-2"
              for="full-name"
            >
              Full Name
            </label>
            <input
              class="w-full bg-gray-200 text-white border border-gray-200 rounded py-3 px-4 mb-3"
              id="full-name"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <Suspense>
            <TimeZoneDropDown />
            <template #fallback>
              <AnimatedPlaceHolder class="max-w-[300px] w-full mb-2"/>
            </template>
          </Suspense>
          <div class="md:w-100 px-3">
            <label
              class="uppercase tracking-wide text-white text-l font-bold mb-2"
              for="select-temp-unit"
            >
              Select Temperature Unit
            </label>
            <select
              class="w-full bg-gray-200 border border-gray-200 text-black text-l py-3 px-4 pr-8 mb-3 rounded"
              id="select-temp-unit"
            >
              <option>C&deg;</option>
              <option>&deg;F</option>
            </select>
          </div>
          <div class="-mx-3 md:flex mt-2">
            <div class="md:w-full px-3">
              <button
                class="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:secondary rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
import TimeZoneDropDown from "../components/TimeZoneDropDown.vue";
import AnimatedPlaceHolder from "../components/AnimatedPlaceHolder.vue";
export default {
  name: "SettingsView",
  setup() {},
  components: { TimeZoneDropDown, AnimatedPlaceHolder },
};
</script>
