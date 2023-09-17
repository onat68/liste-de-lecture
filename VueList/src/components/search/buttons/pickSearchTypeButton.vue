<script setup>
import { ref } from 'vue'

const props = defineProps({
  type: String,
  show: Boolean
})
const type = ref(props.type)
const show = ref(props.show)
const emit = defineEmits(['openMenu'])

function onClick() {
    emit('openMenu')
}
</script>

<template>
  <button
    @click="onClick"
    v-if="(show == false)"
    class="searchTypeButton z-50 flex text-xl text-center font-medium leading-tight w-[60px] h-[60px] box-border text-white hover:bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:border-2 rounded-s5 shrink-0 justify-center items-center"
  >
    {{ type }}
  </button>
</template>
