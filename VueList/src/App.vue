<script setup>
import TimeLineDisplay from './components/TimeLineDisplay.vue'
import SearchResultDisplay from './components/SearchResultDisplay.vue'
import { search } from './search.js'
import gsap from 'gsap'
function onEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      scaleY: 0
    },
    { opacity: 1, scaleY: 1, duration: 5, onComplete: done }
  )
}

function onLeave(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 1,
      scaleY: 1
    },
    { opacity: 0, scaleY: 0, duration: 5, onComplete: done }
  )
}
</script>

<template>
  <transition @after-enter="onEnter" @leave="onLeave">
    <TimeLineDisplay v-if="search.searching == false"></TimeLineDisplay
  ></transition>
  <Transition>
    <SearchResultDisplay
      @before-enter="onEnter"
      @leave="onLeave"
      v-if="search.searching == true"
    ></SearchResultDisplay
  ></Transition>
</template>
