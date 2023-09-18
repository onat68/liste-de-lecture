<script setup>
import AddButton from './cardSubcomponents/AddButton.vue'
import streamingSection from './cardSubcomponents/streamingSection.vue'
import overviewSection from './cardSubcomponents/overviewSection.vue'
import infosSection from './cardSubcomponents/infosSection.vue'

import { ref } from 'vue'
import { provide } from 'vue'
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

provide('albumUrl', albumUrl)

function assignTypeStyles(type) {
  let styles = {}
  if (type == 'Movie') {
    styles.color = 'text-mdPrpl'
    styles.imageH = 'h-[120px] md:h-[180px] '
  } else if (type == 'Book') {
    styles.color = 'text-drkRd'
    styles.imageH = 'h-fit h-36'
  } else if (type == 'Album') {
    styles.imageH = 'h-20 md:h-[120px]'
    styles.color = 'text-mdBl'
  }
  return styles
}

const typeStyles = assignTypeStyles(type.value)

function addItem() {
  list.sendData(data)

  setTimeout((useSearchResultStore.getSearching() = false), 800)
}
</script>

<template>
  <div
    :id="cardId"
    :class="typeStyles.imageH"
    class="CardElement hover:animate-softPulse text-offBlck w-full h- bg-white rounded-s5 shadow flex-row justify-center items-start inline-flex"
  >
    <section class="ImgWrapper w-fit h-fit flex grow-0 shrink-0" v-if="img != 'none' || undefined">
      <img
        class="Image aspect-auto rounded-tl-s5 rounded-bl-s5 text-xs text-gray-400 font-thin w-20 md:w-[120px]"
        :class="typeStyles.imageH"
        :src="img"
        alt="A poster, book or album cover or similar image related to the element displayed in the card"
      />
    </section>

    <section
      class="cardBody font-display h-full grow shrink self-stretch pl-1 pr-2  lg:pl-2 lg:pr-4 pt-1 pb-2 rounded-s5 flex-col justify-between items-start inline-flex gap-0.5"
    >
      <infosSection :data="props.data" :typeStyles="typeStyles"></infosSection>
      <streamingSection v-if="type == 'Album'" :albumUrl="albumUrl"> </streamingSection>
      <overviewSection v-if="type != 'Album'" :note="note"></overviewSection>
    </section>
    <AddButton v-if="useSearchResultStore.getSearching()" @click="addItem"></AddButton>
  </div>
</template>
