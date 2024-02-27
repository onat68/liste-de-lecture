<script setup>
import gsap from 'gsap'
import ItemCard from '../cards/ItemCard.vue';
import { useItemsStore } from '../../stores/ItemsStore.js';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const itemsStore = useItemsStore()

const route = useRoute()
const isSR = ref(false)
const translateVal = ref(-window.innerHeight)
const flexDir = ref('flex-col-reverse')

const cards = ref([])

watch(() => route.name, () => {
    setCards()
}, { immediate: true })


async function setCards() {
    if (route.name === 'search') {
        isSR.value = true
        translateVal.value = window.innerHeight
        flexDir.value = 'flex-col'
        cards.value = itemsStore.srFiltered
    } else {
        cards.value = itemsStore.bmFiltered
    }
}

function onEnter(el, done) {
    gsap.fromTo(
        el,
        {
            opacity: 0,
            translateY: translateVal.value
        },
        {
            opacity: 1,
            translateY: 0,
            ease: 'elastic.out(0.1, 0.5)',
            duration: 2,
            delay: el.dataset.index * 0.25,
            onComplete: done
        }
    )
}
</script>

<template>
    <div :class="flexDir" class="flex justify-start items-center gap-2
        h-full w-full py-2 overflow-y-scroll scrollbar-none">
        <TransitionGroup appear @enter="onEnter">
            <ItemCard :class="'relative'" v-for="(data, index) in cards" :key="index" :data="data" :data-index="index"
                :searchResult="isSR" />
        </TransitionGroup>
    </div>
</template>