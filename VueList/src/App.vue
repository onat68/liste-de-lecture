<script setup>
import TimeLineDisplay from './components/TimeLineDisplay.vue'
import SearchResultDisplay from './components/SearchResultDisplay.vue'
import { search } from './search.js';
</script>

<template>
  <TimeLineDisplay v-if="search.searching == false"></TimeLineDisplay>
  <SearchResultDisplay v-if="search.searching == true"></SearchResultDisplay>
</template>
