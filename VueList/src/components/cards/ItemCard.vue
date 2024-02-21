<!-- eslint-disable eqeqeq -->
<script setup>
import streamingSection from "./cardSubcomponents/streamingSection.vue"
import overviewSection from "./cardSubcomponents/overviewSection.vue"
import infosSection from "./cardSubcomponents/infosSection.vue"
import AddButton from "./cardSubcomponents/AddButton.vue"
import { useItemsStore } from "../../stores/ItemsStore"
import { types } from "../../itemTypes"
import { ref, provide } from "vue"

const itemsStore = useItemsStore()

const props = defineProps({
  data: Object,
  searchResult: Boolean,
})

const searchResult = props.searchResult

const data = props.data


const note = ref(data.note)
const img = ref(data.img)
const type = ref(types.find(type => type.name === data.type))
const cardId = ref(data._id)
const albumUrl = ref(data.albumUrl)
const externalId = ref(data.externalId)

provide("albumUrl", albumUrl)


function addItem() {
  itemsStore.saveItem(data)
}
</script>

<template>
  <div :id="cardId" :class="type.imageH"
    class="CardElement text-offBlck w-full bg-white rounded-s5 shadow flex-row justify-center items-start inline-flex">
    <section class="ImgWrapper w-fit h-fit flex grow-0 shrink-0" v-if="img != 'none' || undefined">
      <img class="Image aspect-auto rounded-tl-s5 rounded-bl-s5 text-xs text-gray-400 font-thin w-16" :class="type.imageH"
        :src="img" alt="A poster, book or album cover or similar image related to the element displayed in the card"
        loading="lazy" />
    </section>

    <section
      class="cardBody font-display h-full grow shrink self-stretch p-1 rounded-s5 flex-col justify-between items-start inline-flex gap-0.5">
      <infosSection :data="props.data" :type="type" />

      <streamingSection v-if="type.name === 'Album'" :albumUrl="albumUrl" :externalId="externalId" />

      <overviewSection v-if="type.name != 'Album'" :note="note" />
    </section>

    <AddButton v-if="searchResult" @click="addItem" />
  </div>
</template>
