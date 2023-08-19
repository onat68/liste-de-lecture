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

function assignTypeColor(type) {
  if (type == 'Movie') {
    return 'text-mdPrpl'
  } else if (type == 'Book') {
    return 'text-drkRd'
  } else if (type == 'Album') {
    return 'text-mdBl'
  }
}



const typeColor = assignTypeColor(type.value)
</script>

<template>
  <div
    :id="cardId"
    class="CardElement text-offBlck font-bold w-full basis-[120px] bg-white rounded-s5 shadow flex-col justify-start items-start inline-flex"
  >
    <div class="Wrapper0 h-full self-stretch rounded-s5 justify-center items-start inline-flex">
      <div class="ImgWrapper w-fit h-fit flex">
        <img
          class="Jwposter1 h-[12Opx] w-20 aspect-auto rounded-tl-s5 rounded-bl-s5 text-xs text-gray-400 font-thin"
          :src="img"
          alt="A poster, book or album cover or similar image related to the element displayed in the card"
        />
      </div>
      <section
        class="TextWrapper font-display h-full w-full grow shrink basis-0 self-stretch pl-1 pr-2 py-1 rounded-s5 flex-col justify-start items-start inline-flex"
      >
        <section
          class="MainInfoWrapper h-min w-full flex-col self-stretch justify-between items-baseline inline-flex"
        >
          <div
            class="TitleTypeWrapper w-full h-min flex-row justify-between items-start inline-flex"
          >
            <h3 class="Title text-base font-display font-bold leading-5">
              {{ title }}
            </h3>
            <p :class="typeColor" class="Type text-base font-medium leading-tight">{{ type }}</p>
          </div>
          <div class="AuthorInfosWrapper w-full h-mi font-medium flex flex-row justify-between">
            <h4 class="Author text-xs leading-4 h-min">Chad Stahelski</h4>
            <section
              class="InfosWrapper h-min flex-row wrap text-[10px] leading-4 gap-0.5 inline-flex self-end"
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
            class="self-stretch h-full w-full grow shrink basis-0 text-neutral-900 text-[10px] font-extralight text-ellipsis overflow-hidden whitespace-normal"
          >
            {{ overview }}
          </p>
        </section>
      </section>
      <addButton v-if="props.target == 'searchResults'"></addButton>
    </div>
  </div>
</template>
