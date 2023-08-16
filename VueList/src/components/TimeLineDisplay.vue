<script setup>
import SearchBar from './SearchBar.vue'
import itemCard from './itemCard.vue'
</script>

<template>
  <div
    class="Property1Vuetimeline w-iphone8 h-iphone8 rounded-md flex-col justify-center items-center inline-flex border border-gray-400"
  >
    <div class="Screen p-2 pb-0 rounded-s5 bg-white w-full h-full">
      <div
        class="Innerscreen rounded-s5 w-full h-full self-stretch grow shrink basis-0 p-2 bg-gradient-to-b from-gray-900 via-sky-700 to-gray-900 shadow-inner justify-center items-center gap-2 flex"
      >
        <div class="Line w-fit h-full py-2">
          <div class="w-0.5 h-full bg-opgr1"></div>
        </div>
        <div
          class="Frame28 w-full h-full flex-col justify-center items-center gap-2 inline-flex"
        >
          <itemCard></itemCard>
        </div>
      </div>
    </div>
    <SearchBar></SearchBar>
  </div>
</template>
