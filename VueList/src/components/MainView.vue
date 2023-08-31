<script setup>
import TimeLineInnerScreen from './displays/TimeLineInnerScreen.vue'
import SearchResultInnerScreen from './displays/SearchResultInnerScreen.vue'
import SearchBar from './uiComponents/SearchBar.vue'
import { search } from '../search'

import { gsap } from 'gsap'
function onEnter(el) {
  gsap.fromTo(
    el,
    {
      opacity: 0
    },
    {
      opacity: 1,
      duration: 1
    }
  )
}
function onLeave(el) {
  gsap.fromTo(
    el,
    {
      opacity: 1
    },
    {
      opacity: 0,
      duration: 1
    }
  )
}
</script>

<template>
  <div
    class="font-body Vuetimeline w-iphone8 h-iphone8 rounded-md flex-col justify-end items-center inline-flex border shrink"
  >
    <div class="Screen w-full p-2 pb-0 rounded-s5 bg-white flex shrink grow overflow-hidden">
      <Transition v-if="search.searching == false" @enter="onEnter(this)" @leave="onLeave(this)">
        <TimeLineInnerScreen></TimeLineInnerScreen
      ></Transition>
      <Transition v-if="search.searching" @enter="onEnter(this)" @leave="onLeave(this)">
        <SearchResultInnerScreen> </SearchResultInnerScreen>
      </Transition>
    </div>
    <SearchBar></SearchBar>
  </div>
</template>
