<script setup>
import SearchTypeButton from './buttons/SearchTypeButton.vue'
import { useItemsStore } from '../../stores/ItemsStore';
const itemsStore = useItemsStore()

function setType(type) {
  itemsStore.pickedType = type
  itemsStore.closePicker()
}
</script>
<template>
  <div v-if="!itemsStore.pickerOpened" class="box-border w-fit relative">
    <SearchTypeButton :type="itemsStore.pickedType" :action="itemsStore.openPicker" :class="'relative'" />
  </div>
  <div v-else-if="itemsStore.pickerOpened" class="box-border flex w-fit relative gap-1.5">
    <SearchTypeButton v-for="(type, index) in itemsStore.unpickedTypes" :class="'relative'" :key="index" :type="type"
      @click="setType(type)" />
  </div>
</template>