<script setup>
import { ref } from 'vue'
const props = defineProps({
  type: String
})

const type = ref(props.type)
</script>

<template>
  <button
    class="Button text-xl text-center font-medium leading-tight w-[60px] h-[60px] box-border text-white hover:bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:border-2 rounded-s5 shrink-0 justify-center items-center inline-flex"
  >
    {{ type }}
  </button>
</template>
