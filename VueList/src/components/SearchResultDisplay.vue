<script setup>
import SearchBar from './SearchBar.vue'
import gsap from 'gsap'

function onEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      translateY: window.innerHeight
    },
    {
      opacity: 1,
      translateY: 0,
      ease: 'elastic.out(0.1, 0.5)',
      duration: 2,
      delay: el.dataset.index * 0.25,
      onComplete: done
    }
  )
}

import itemCard from './itemCard.vue'

const target = ref('timeline')
import { ref } from 'vue'

import { search } from '../search'
</script>

<template>
  <div
    class="font-body Vuetimeline w-iphone8 h-iphone8 rounded-md flex-col justify-end items-center inline-flex border shrink"
  >
    <div class="Screen p-2 pb-0 rounded-s5 bg-white w-full flex shrink grow overflow-hidden">
      <div
        class="Innerscreen relative w-full rounded-s5 self-stretch grow shrink basis-0 p-2 bg-srRes shadow-inner justify-center items-center gap-2 flex overflow-clip"
      >
        <div
          class="absolute bg-mask2 pointer-events-none bottom-0 left-0 right-0 top-0 h-full w-full z-40 rounded-s5 bg-clip-content"
        ></div>
        <div
          class="CardWrapper flex-col justify-start items-center gap-2 h-full w-full pb-20 inline-flex overflow-y-scroll scrollbar-none"
        >
          <TransitionGroup @enter="onEnter"
            ><itemCard
              v-for="(data, index) in search.searchResults"
              :key="data.id"
              :data="data"
              :target="target"
              :data-index="index"
            ></itemCard
          ></TransitionGroup>
        </div>
      </div>
    </div>
    <SearchBar></SearchBar>
  </div>
</template>
