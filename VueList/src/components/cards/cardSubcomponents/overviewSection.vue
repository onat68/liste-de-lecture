<script setup>
import { ref } from 'vue'
const props = defineProps({
  about: String
})
const about = ref(props.about)
</script>

<template>
  <section class="aboutSection flex h-full justify-end">
  <p class="text-[10px] leading-snug w-full font-extralight text-ellipsis line-clamp-5">
    {{ about }}
  </p></section>
</template>
