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
    class="Button relative transition duration-150 hover:scale-105 hover:shadow-md hover:shadow-gray-400 w-16 md:w-32 lg:w-64 h-6 md:h-20 l-h-40 p-1 rounded-[5px] shadow flex-col justify-center items-center gap-2.5 inline-flex"
    @click="openLink"
  >
    <img
      class="Logo w-12 md:w-24 lg:w-36 h-4 md:h-8 lg:h-12 aspect-auto"
      src="../../../assets/Brand logos/Logotype-Deezer/Logotype/DIGITAL RGB/SVG/Deezer_Logo_RVB_MonoWhite.svg"
      :alt="alt"
    />
  </button>
</template>
