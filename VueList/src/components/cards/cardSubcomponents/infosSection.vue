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
      class="TitleTypeWrapper self-stretch h-min gap-1 flex-row justify-between items-start inline-flex"
    >
      <h3 class="Title text-base self-stretch font-display font-bold leading-5 line-clamp-1">
        {{ title }}
      </h3>
      <p :class="typeStyles.color" class="Type text-base font-medium leading-tight">
        {{ type }}
      </p>
    </div>
    <div
      class="AuthorInfosWrapper w-full text-xs leading-4 h-min font-medium flex flex-row justify-between gap-2 flex-wrap-reverse gap-y-0"
    >
      <h4 class="Author h-min w-[15ch] truncate">{{ authors }}</h4>
      <section class="InfosWrapper h-min flex-row gap-0.5 inline-flex self-end">
        <p class="Genre">{{ genre }}</p>
        <p v-if="(type != 'Album' ) && (genre != undefined)" class="dash">/</p>
        <p v-if="props.data.releaseDate != undefined" class="ReleaseYear">
          {{ releaseDate.slice(0, 4) }}
        </p>
      </section>
    </div>
  </section>
</template>
