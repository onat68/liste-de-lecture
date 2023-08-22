<script setup>
const props = defineProps({
  brand: String,
  url: String
})

const brand = props.brand
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
  <div
    :class="brandStyle.bg"
    class="Button w-12 h-5 p-1 rounded-[5px] shadow flex-col justify-center items-center gap-2.5 inline-flex"
  >
    <img
      class="Logo w-10 h-3 aspect-auto"
      src="../assets/Brand logos/Logotype-Deezer/Logotype/DIGITAL RGB/SVG/Deezer_Logo_RVB_MonoWhite.svg"
      :alt="alt"
    />
  </div>
</template>
