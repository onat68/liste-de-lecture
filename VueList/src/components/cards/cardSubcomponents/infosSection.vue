<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: Object,
  typeStyles: Object
})

const authors = ref(props.data.authors)
const title = ref(props.data.title)
const releaseDate = ref(props.data.releaseDate)
const genre = ref(props.data.genre)
const typeStyles = ref(props.typeStyles)
const type = ref(props.data.type)
</script>

<template>
  <section
    class="MainInfoWrapper h-min flex-col self-stretch justify-between items-baseline inline-flex"
  >
    <div
      class="TitleTypeWrapper text-base sm:text-base md:text-lg lg:text-xl self-stretch h-min gap-1 flex-row justify-between items-start flex"
    >
      <h3 class="Title self-stretch font-display font-bold leading-tight line-clamp-1">
        {{ title }}
      </h3>
      <p :class="typeStyles.color" class="Type font-medium leading-tight">
        {{ type }}
      </p>
    </div>
    <div
      class="AuthorInfosWrapper w-full text-xs sm:text-xs md:text-base lg:text-md leading-4 h-min font-medium flex flex-row justify-between gap-2 gap-y-0"
    >
      <h4 class="Author h-min line-clamp-1">{{ authors }}</h4>
      <section class="InfosWrapper h-min flex-row gap-0.5 inline-flex self-end">
        <p class="Genre">{{ genre }}</p>
        <p v-if="(type != 'Album' ) && (genre != undefined)" class="dash">/</p>
        <p v-if="releaseDate != undefined" class="ReleaseYear">
          {{ releaseDate.slice(0, 4) }}
        </p>
      </section>
    </div>
  </section>
</template>
