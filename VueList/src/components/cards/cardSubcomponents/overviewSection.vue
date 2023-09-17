<script setup>
import { ref } from 'vue'
const props = defineProps({
  note: String
})
const note = ref(props.note)
</script>

<template>
  <p class="text-[10px] md:text-xs lg:text-base leading-snug w-full font-extralight text-ellipsis line-clamp-4">
    {{ note }}
  </p>
</template>
