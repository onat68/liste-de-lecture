<script setup>
import addButton from './addButton.vue'
import MusicButton from './MusicButton.vue'

import { ref } from 'vue'

import { search } from '../search'
import { list } from '../list'

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
const author = ref(data.authors)
const albumUrl = ref(data.url)

// static for now, ref later
const userDefStreamingService = 'Deezer'

function assignTypeStyles(type) {
  let styles = {}
  if (type == 'Movie') {
    styles.color = 'text-mdPrpl'
    styles.imageHeight = 'h-[120px]'
  } else if (type == 'Book') {
    styles.color = 'text-drkRd'
    styles.imageHeight = 'h-fit'
  } else if (type == 'Album') {
    styles.imageHeight = 'h-20'
    styles.color = 'text-mdBl'
  }
  return styles
}

function addItem() {
  list.sendData(data)

  setTimeout((search.searching = false), 800)
}

const typeStyles = assignTypeStyles(type.value)
</script>

<template>
  <div
    :id="cardId"
    :class="typeStyles.imageHeight"
    class="CardElement text-offBlck font-bold w-full bg-white rounded-s5 shadow flex-row justify-center items-start inline-flex"
  >
    <section class="ImgWrapper w-fit h-fit flex grow-0 shrink-0" v-if="img != 'none' || undefined">
      <img
        class="Jwposter1 w-20 aspect-auto rounded-tl-s5 rounded-bl-s5 text-xs text-gray-400 font-thin"
        :src="img"
        alt="A poster, book or album cover or similar image related to the element displayed in the card"
      />
    </section>
    <section
      class="TextWrapper font-display h-full grow shrink basis-0 self-stretch pl-1 pr-2 pt-1 pb-2 rounded-s5 flex-col justify-start items-start inline-flex"
    >
      <section
        class="MainInfoWrapper h-min flex-col self-stretch justify-between items-baseline inline-flex"
      >
        <div
          class="TitleTypeWrapper self-stretch h-min gap-1 flex-row justify-between items-start inline-flex"
        >
          <h3
            class="Title text-base self-stretch font-display w-[15ch] font-bold leading-5 truncate"
          >
            {{ title }}
          </h3>
          <p :class="typeStyles.color" class="Type text-base font-medium leading-tight">
            {{ type }}
          </p>
        </div>
        <div class="AuthorInfosWrapper h-mi font-medium flex flex-row justify-between">
          <h4 class="Author text-xs leading-4 h-min">{{ author }}</h4>
          <section
            class="InfosWrapper h-min flex-row wrap text-[10px] leading-4 gap-0.5 inline-flex self-end"
          >
            <p class="Genre">{{ genre }}</p>
            <!-- <p class="Dash">-</p> -->
            <p class="ReleaseYear">{{ releaseDate }}</p>
          </section>
        </div>
      </section>
      <section
        v-if="type == 'Album'"
        class="streamingServicesWrapper h-full flex items-end content-end gap-1 self-stretch wrap"
      >
        <MusicButton :brand="userDefStreamingService" :albumUrl="albumUrl"></MusicButton>
      </section>
      <section
        v-if="type == 'Book' || type == 'Movie'"
        class="OverviewWrapper self-stretch grow shrink basis-0 pt-1 flex-col justify-start items-start gap-2.5 flex"
      >
        <p
          class="self-stretch h-full grow shrink basis-0 text-[10px] pb-1 font-extralight overflow-hidden"
        >
          {{ overview }}
        </p>
      </section>
    </section>
    <addButton v-if="search.searching" @click="addItem"></addButton>
  </div>
</template>
