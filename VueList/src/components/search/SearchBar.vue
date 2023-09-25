<script setup>
import { useSearchResults } from '../../stores/useSearchResultStore'
import { typePicker } from '../../typePicker'

import SearchTypeButton from './buttons/SearchTypeButton.vue'
import CancelButton from './buttons/CancelButton.vue'
import SearchButton from './buttons/SearchButton.vue'
import searchField from './searchField.vue'
const search = useSearchResults()

import { ref } from 'vue'
const query = ref('')

const typesToDisplay = () => {
  if (typePicker.opened) {
    return typePicker.otherTypes
  } else {
    return []
  }
}

function open() {
  typePicker.open()
}

function setType(type) {
  typePicker.setType(type)
}
</script>

<template>
  <div
    class="SearchBar font-display h-fit w-full p-1.5 md:p-2 bg-white rounded-[5px] justify-center items-center gap-1.5 md:gap-2 flex overflow-visible z-40"
  >
    <transition name="div" mode="out-in">
      <div v-if="!typePicker.opened" class="box-border w-fit relative">
        <SearchTypeButton :type="typePicker.currentType" :action="open" :class="'relative'">
        </SearchTypeButton>
      </div>
      <div v-else-if="typePicker.opened" class="box-border flex w-fit relative gap-1.5 md:gap-2">
        <SearchTypeButton
          v-for="(type, index) in typesToDisplay()"
          :class="'relative'"
          :key="index"
          :type="type"
          @click="setType(type)"
        ></SearchTypeButton>
      </div>
    </transition>
    <transition name="div"> <CancelButton :class="'relative'" v-if="search.getSearching"></CancelButton></transition>
    <searchField v-model="query" :class="typePicker.currentType.focusColor"></searchField>
    <transition name="divrev">
      <SearchButton
        v-if="!typePicker.opened"
        :class="relative"
        @click="search.search(typePicker.currentType.typeName, query)"
      ></SearchButton
    ></transition>
  </div>
</template>

<style>
.div-enter-active,
.div-leave-active {
  transition: all 0.2s ease;
}
.div-enter-from,
.div-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.divrev-enter-active,
.divrev-leave-active {
  transition: all 0.2s ease;
}
.divrev-enter-from,
.divrev-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
