<script setup>
import MusicButton from './MusicButton.vue'
const props = defineProps({
  albumUrl: String
})
const albumUrl = props.albumUrl
// static for now, ref later
const userDefStreamingService = 'Deezer'
</script>
<template>
  <section
    class="streamingServicesWrapper h-full flex items-end content-end gap-1 self-stretch wrap"
  >
    <MusicButton :brand="userDefStreamingService" :albumUrl="albumUrl"></MusicButton>
  </section>
</template>
