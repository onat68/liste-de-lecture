<script setup>
import addButton from '../addButton.vue'
import streamingSection from './cardSubcomponents/streamingSection.vue'
import overviewSection from './cardSubcomponents/overviewSection.vue'
import infosSection from './cardSubcomponents/infosSection.vue'

import { ref } from 'vue'

import { search } from '../../search'
import { list } from '../../list'

const props = defineProps({
  data: Object,
  target: String
})

const data = props.data

const note = ref(data.note)
const img = ref(data.img)
const type = ref(data.type)
const cardId = ref(data._id)
const albumUrl = ref(data.albumUrl)

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

const typeStyles = assignTypeStyles(type.value)

function addItem() {
  list.sendData(data)

  setTimeout((search.searching = false), 800)
}
</script>

<template>
  <div
    :id="cardId"
    :class="typeStyles.imageHeight"
    class="CardElement text-offBlckfont-bold w-full bg-white rounded-s5 shadow flex-row justify-center items-start inline-flex"
  >
    <section class="ImgWrapper w-fit h-fit flex grow-0 shrink-0" v-if="img != 'none' || undefined">
      <img
        class="Jwposter1 w-20 aspect-auto rounded-tl-s5 rounded-bl-s5 text-xs text-gray-400 font-thin"
        :src="img"
        alt="A poster, book or album cover or similar image related to the element displayed in the card"
      />
    </section>

    <section
      class="cardBody font-display h-full grow shrink self-stretch pl-1 pr-2 pt-1 pb-2 rounded-s5 flex-col justify-start items-start inline-flex gap-0.5"
    >
      <infosSection :data="props.data" :typeStyles="typeStyles"></infosSection>
      <streamingSection v-if="type == 'Album'" :albumUrl="albumUrl"> </streamingSection>
      <overviewSection v-if="type != 'Album'" :note="note"></overviewSection>
    </section>
    <addButton v-if="search.searching" @click="addItem"></addButton>
  </div>
</template>
