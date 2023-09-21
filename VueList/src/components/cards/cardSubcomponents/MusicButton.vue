<script setup>
const props = defineProps({
  brand: String
})

import { inject } from 'vue'

const brand = props.brand
const albumUrl = inject('albumUrl').value

function openLink() {
  console.log(albumUrl)
  window.open(albumUrl, '_blank')
}
const alt = `Brand logo for ${brand} indicating a button linking to their music streaming service`

const brandStyle = {}

if (brand == 'YouTube') {
  brandStyle.bg = '#F00'
} else if (brand == 'Deezer') {
  brandStyle.bg = 'bg-gradient-to-r from-yellow-400 via-fuchsia-800 to-blue-800'
} else if (brand == 'Spotify') {
  brandStyle.bg = '#1DB954'
}
</script>

<template>
  <button
    :class="brandStyle.bg"
    class="Button relative transition duration-150 hover:scale-103 hover:shadow-md hover:shadow-gray-400 w-12 md:w-16 h-5 md:h-8 p-1 rounded-[5px] shadow flex-col justify-center items-center gap-2.5 inline-flex"
    @click="openLink"
  >
    <img
      class="Logo aspect-auto"
      src="../../../assets/Brand logos/Logotype-Deezer/Logotype/DIGITAL RGB/SVG/Deezer_Logo_RVB_MonoWhite.svg"
      :alt="alt"
    />
  </button>
</template>
