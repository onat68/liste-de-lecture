<script setup>
import { useSearchResults } from '../../stores/useSearchResultStore'
import { typePicker } from '../../typePicker'
const search = useSearchResults()
</script>

<template>
  <input
    type="field"
    v-model="query"
    @keypress.enter="search.search(typePicker.currentType.typeName, query)"
    class="SearchField flex grow focus-visible:outline-none border-transparent border-2 px-2 py-1 text-base md:text-md font-normal w-full h-12 md:h-16 bg-neutral-200 rounded-s5 shadow-inner"
  />
</template>
