<script setup>
import { useSearchResults } from '../../stores/useSearchResultStore'
import { typePicker } from '../../typePicker'
import gsap from 'gsap'

import SearchTypeButton from './buttons/SearchTypeButton.vue'
import CancelButton from './buttons/CancelButton.vue'
import SearchButton from './buttons/SearchButton.vue'

const search = useSearchResults()

import { ref } from 'vue'
const query = ref('')

function onEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      rotateX: 180
    },
    {
      opacity: 1,
      rotateX: 0,
      duration: 3,
      onComplete: done
    }
  )
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
    class="SearchBar font-display h-20 w-full p-2 bg-white rounded-[5px] justify-center items-center gap-2 flex overflow-visible z-40"
  >
    <SearchTypeButton
      :type="typePicker.currentType"
      :action="open"
      @enter="onEnter"
      v-if="typePicker.opened == false"
    >
    </SearchTypeButton>
    <TransitionGroup @enter="onEnter" v-if="typePicker.opened">
      <SearchTypeButton
        v-for="(type, index) in typePicker.otherTypes"
        :key="index"
        :type="type"
        :action="setType"
      ></SearchTypeButton>
    </TransitionGroup>
    <CancelButton v-if="search.getSearching"></CancelButton>
    <input
      v-model="query"
      type="field"
      id="search-field"
      :class="typePicker.currentType.focusColor"
      @keypress.enter="search.search(typePicker.currentType.typeName, query)"
      class="SearchField flex grow focus-visible:outline-none focus-visible:border-2 px-2 py-1 text-xl font-medium w-full h-full bg-neutral-200 rounded-s5 shadow-inner"
    />
    <SearchButton
      v-show="typePicker.opened != true"
      @click="search.search(typePicker.currentType.typeName, query)"
    ></SearchButton>
  </div>
</template>
