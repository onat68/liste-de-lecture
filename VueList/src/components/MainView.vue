<script setup>
import TimeLineInnerScreen from './timeline/TimeLineInnerScreen.vue'
import SearchResultInnerScreen from './search/SearchResultInnerScreen.vue'
import SearchBar from './search/SearchBar.vue'
import loadingScreen from './loadingScreen.vue'
import { useSearchResults } from '../stores/useSearchResultStore'
import { ref, watch } from 'vue'
const search = useSearchResults()
const loading = ref()
toggleLoader()

function toggleLoader() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}

watch(search.searching, toggleLoader())
</script>

<template>
  <div
    class="font-body Vuetimeline w-full h-full rounded-md flex-col justify-end items-center inline-flex border shrink"
  >
    <div
      class="Screen w-full h-full p-1.5 md:p-2 pb-0 rounded-s5 bg-white flex shrink grow overflow-hidden"
    >
      <Transition name="screen">
        <TimeLineInnerScreen v-if="!search.getSearching && !loading"></TimeLineInnerScreen>
        <SearchResultInnerScreen v-else-if="search.getSearching && !loading">
        </SearchResultInnerScreen
        ><loadingScreen v-else-if="loading"></loadingScreen
      ></Transition>
    </div>
    <SearchBar></SearchBar>
  </div>
</template>
<style></style>
