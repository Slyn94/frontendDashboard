<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const spaceList = ref([]);
const FORM: any = ref({
  onOff: 0  //standaard op uit ingesteld (placeholder)
});
const authStore = useAuthStore();

onMounted(() => {
  console.log(authStore.token); // log the token value
  fetch("http://localhost:9191/space/all", {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
    .then((response) => response.json())
    .then((apiSpaces) => {
      spaceList.value = apiSpaces;
    });
});

const addDevice = async (event: any) => {
  event.preventDefault(); // prevent form from submitting normally
  console.log('FORM', JSON.stringify(FORM.value))
  const response = await fetch("http://localhost:9191/device/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
    body: JSON.stringify(FORM.value),
  });

  if (response.ok) {
    const newDevice = await response.json();
    console.log(newDevice);
    // TODO: add logic to handle successful device creation
  } else {
    console.error(response.statusText);
    // TODO: add logic to handle error
  }
};
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Add a new device
      </h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Device Name</label
            >
            <input
              type="text"
              name="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type device name"
              required=""
              v-model="FORM.naam"
            />
          </div>
          <div class="w-full">
            <label
              for="label"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Category</label
            >
            <input
              type="text"
              name="label"
              id="label"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Device category"
              required=""
              v-model="FORM.label"
            />
          </div>

          <div>
            <label
              for="category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Space</label
            >
            <select
              v-model="FORM.space"
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected="" v-bind:value="undefined">Select a space...</option>

              <option
                v-for="space in spaceList"
                :key="space.id"
                :space="space"
                v-bind:value="space"
              >
                {{ space.id }}
              </option>
            </select>
          </div>

          <div>
            <label
              for="onOff"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >ON or OFF</label
            >
            <select
              v-model="FORM.onOff"
              id="onOff"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option selected=""  v-bind:value="1">ON</option>
              <option selected=""  v-bind:value="0">OFF</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800"
          @click="addDevice"
        >
          Add product
        </button>
      </form>
    </div>
  </section>
</template>
