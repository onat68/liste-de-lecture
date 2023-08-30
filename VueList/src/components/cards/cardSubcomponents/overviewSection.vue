<script setup>
import { ref } from 'vue'
const props = defineProps({
  note: String
})
const note = ref(props.note)
</script>

<template>
  <p class="text-[10px] leading-snug w-full font-extralight text-ellipsis line-clamp-5">
    {{ note }}
  </p>
</template>
