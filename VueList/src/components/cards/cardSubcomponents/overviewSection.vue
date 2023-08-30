<script setup>
import { ref } from 'vue'
const props = defineProps({
  note: String
})
const note = ref(props.note)
</script>

<template>
  <section class="noteSection pt-2 pb-1">
  <p class="text-[10px] leading-snug w-full font-extralight text-ellipsis line-clamp-4">
    {{ note }}
  </p></section>
</template>
