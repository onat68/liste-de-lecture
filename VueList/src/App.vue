<script setup>
import MainView from './components/MainView.vue'
import gsap from 'gsap'

function onEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      scaleY: 0
    },
    { opacity: 1, scaleY: 1, duration: 1, onComplete: done }
  )
}

function onLeave(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 1,
      scaleY: 1
    },
    { opacity: 0, scaleY: 0, duration: 1, onComplete: done }
  )
}
</script>

<template>
  <transition @enter="onEnter" @before-leave="onLeave">
    <MainView> </MainView>
  </transition>
</template>
