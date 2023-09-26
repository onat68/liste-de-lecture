<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: Object,
  action: Function
})
const action = ref(props.action)
const type = ref(props.type)
</script>

<template>
  <button   aria-label="PickTypeOfContentToSearchButton"
    @click="action"
    :class="type.typeColor"
    class="searchTypeButton z-50 flex text-base md:text-md text-center font-extralight font-body leading-tight w-12 md:w-16 h-12 md:h-16 box-border text-white hover:bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:border-2 rounded-s5 shrink-0 justify-center items-center"
  >
    {{ type.typeName }}
  </button>
</template>
