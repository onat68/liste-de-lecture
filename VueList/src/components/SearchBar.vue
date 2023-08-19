<script setup>
import gsap from 'gsap'
import { ref } from 'vue'
const onOver = (el) => {
 gsap.to(el, {  translateY: -4,
duration: 1})
}

const onLeave = (el) => {
  console.log(el)
  gsap.to(el, {  translateY: 0,
duration: 1})
}
</script>

<template>
  <div
    class="Property1Timelineresearch w-full h-20 p-2 bg-white rounded-[5px] justify-center items-center gap-2 flex"
  >
    <div
      class="Button w-[60px] h-[60px] box-border pl-[9px] pr-[7px] bg-mdBl rounded-s5 shrink-0 justify-center items-center inline-flex"
    >
      <img
        src="../assets/FolderIcon.svg"
        alt="Icon of an open folder to indicate a button that opens the finder"
        class="w-5 aspect-auto fill-white"
      />
    </div>
    <input
      v-model="text"
      type="field"
      id="search-field"
      class="SearchField px-4 py-2 text-xl text-center w-full h-full bg-neutral-200 rounded-s5 shadow-inner"
    />
    <button
      @mouseover="onOver"
      @mouseleave="onLeave"
      @click="triggerSearch"
      class="Button w-[60px] h-[60px] bg-brGr rounded-s5 box-border shrink-0 justify-center items-center inline-flex"
    >
      <img
        src="../assets/SearchIcon.svg"
        alt="Icon of a magnifying-glass to indicate a search button"
        class="w-5 aspect-auto fill-white"
      />
    </button>
  </div>
</template>
