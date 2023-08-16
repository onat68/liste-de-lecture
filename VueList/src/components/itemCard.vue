<script setup>
import addButton from './addButton.vue'

import { ref } from 'vue'

const props = defineProps({
  data: Object,
  target: String
})

const data = props.data

const title = ref(data.title)
const releaseDate = ref(data.releaseDate)
const overview = ref(data.note)
const img = ref(data.img)
const type = ref(data.type)
const cardId = ref(data._id)
const genre = ref(data.genre)

function isSearchResult(target) {
  if (target == 'search results') {
    return true
  } else {
    return false
  }
}
</script>

<template>
  <div
    :id="cardId"
    class="CardElement font-['Neue Helvetica'] w-full h-[120px] bg-white rounded-s5 shadow flex-col justify-start items-start inline-flex"
  >
    <div class="Wrapper0 h-full self-stretch rounded-s5 justify-center items-start inline-flex">
      <div class="ImgWrapper w-fit h-fit flex">
        <img
          class="Jwposter1 h-[12Opx] w-20 aspect-auto rounded-tl-s5 rounded-bl-s5"
          :src="img"
          alt="A poster, book or album cover or similar image related to the element displayed in the card"
        />
      </div>
      <section
        class="TextWrapper h-full w-full grow shrink basis-0 self-stretch pl-1 pr-2 py-1 rounded-s5 flex-col justify-start items-start inline-flex"
      >
        <section
          class="MainInfoWrapper h-min w-full flex-col self-stretch justify-between items-baseline inline-flex"
        >
          <div
            class="TitleTypeWrapper w-full h-min flex-row justify-between items-start inline-flex"
          >
            <h3 class="Title text-neutral-900 text-base font-bold leading-tight">
              {{ title }}
            </h3>
            <p class="Type text-purple-500 text-base font-light leading-tight">{{ type }}</p>
          </div>
          <div
            class="AuthorInfosWrapper w-full h-min text-neutral-900 font-normal flex flex-row justify-between"
          >
            <h4 class="Author text-xs font-medium leading-4 h-min">Chad Stahelski</h4>
            <section
              class="InfosWrapper h-min flex-row wrap text-[10px] leading-4 font-normal gap-0.5 inline-flex self-end"
            >
              <p class="Genre">{{ genre }}</p>
              <p class="Dash">-</p>
              <p class="ReleaseYear">{{ releaseDate }}</p>
            </section>
          </div>
        </section>
        <section
          class="OverviewWrapper self-stretch grow shrink basis-0 pt-1 flex-col justify-start items-start gap-2.5 flex"
        >
          <p
            class="self-stretch h-full w-full grow shrink basis-0 text-neutral-900 text-[10px] font-extralight text-ellipsis truncate whitespace-normal"
          >
            {{ overview }}
          </p>
        </section>
      </section>
      <addButton :v-if="isSearchResult"></addButton>
    </div>
  </div>
</template>
