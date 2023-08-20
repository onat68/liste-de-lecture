<script setup>
import TimeLineDisplay from './components/TimeLineDisplay.vue'
import SearchResultDisplay from './components/SearchResultDisplay.vue'
import { search } from './search.js'
import { gsap } from 'gsap'
function appear(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0
    },
    { opacity: 1, duration: 5, onComplete: done }
  )
}

function leave(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 1
    },
    { opacity: 0, duration: 5, onComplete: done }
  )
}
</script>

<template>
  <TimeLineDisplay
    v-if="search.searching == false"
    @vnode-mounted="appear"
    @vnode-unmounted="leave"
  ></TimeLineDisplay>
  <SearchResultDisplay
    v-if="search.searching == true"
    @vnode-mounted="appear"
    @vnode-unmounted="leave"
  ></SearchResultDisplay>
</template>
