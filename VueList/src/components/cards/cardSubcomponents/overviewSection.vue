<script setup>
import { ref } from 'vue'
const props = defineProps({
  about: String
})
const about = ref(props.about)
</script>

<template>
  <p class="text-[10px] align-text-bottom leading-snug w-full pb-1 font-extralight text-ellipsis line-clamp-5">
    {{ about }}
  </p>
</template>
