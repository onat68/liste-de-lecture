<script setup>
import SearchBar from './SearchBar.vue'
import gsap from 'gsap'


import {list} from '../list'
list.getData();

function onEnter(el, done) {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      translateY: -window.innerHeight
    },
    {
      opacity: 1,
      translateY: 0,
      ease: 'elastic.out(0.1, 0.5)',
      duration: 3,
      delay: el.dataset.index * 0.25,
      onComplete: done
    }
  )
}

import itemCard from './itemCard.vue'

const target = ref('timeline')
import { ref } from 'vue'
// const responseData = ref([
//   {
//     title: 'John Wick: Chapter 4',
//     releaseDate: '2023',
//     note: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
//     img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FkPsRQfoyYgcpbI6hvDQvUSCo0q3.jpg&f=1&nofb=1&ipt=92930009c5415ffb7c7f8e2ce07f42a0bfe0db7cee81c5ba8eec8b3eeeb29171&ipo=images',
//     type: 'Movie',
//     _id: '123',
//     genre: 'Action/Crime'
//   },
//   {
//     title: 'John Wick: Chapter 4',
//     releaseDate: '2023',
//     note: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
//     img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FkPsRQfoyYgcpbI6hvDQvUSCo0q3.jpg&f=1&nofb=1&ipt=92930009c5415ffb7c7f8e2ce07f42a0bfe0db7cee81c5ba8eec8b3eeeb29171&ipo=images',
//     type: 'Movie',
//     _id: '123',
//     genre: 'Action/Crime'
//   },
//   {
//     title: 'John Wick: Chapter 4',
//     releaseDate: '2023',
//     note: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
//     img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FkPsRQfoyYgcpbI6hvDQvUSCo0q3.jpg&f=1&nofb=1&ipt=92930009c5415ffb7c7f8e2ce07f42a0bfe0db7cee81c5ba8eec8b3eeeb29171&ipo=images',
//     type: 'Movie',
//     _id: '123',
//     genre: 'Action/Crime'
//   },
//   {
//     title: 'John Wick: Chapter 4',
//     releaseDate: '2023',
//     note: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
//     img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FkPsRQfoyYgcpbI6hvDQvUSCo0q3.jpg&f=1&nofb=1&ipt=92930009c5415ffb7c7f8e2ce07f42a0bfe0db7cee81c5ba8eec8b3eeeb29171&ipo=images',
//     type: 'Movie',
//     _id: '123',
//     genre: 'Action/Crime'
//   },
//   {
//     title: 'John Wick: Chapter 4',
//     releaseDate: '2023',
//     note: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
//     img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FkPsRQfoyYgcpbI6hvDQvUSCo0q3.jpg&f=1&nofb=1&ipt=92930009c5415ffb7c7f8e2ce07f42a0bfe0db7cee81c5ba8eec8b3eeeb29171&ipo=images',
//     type: 'Movie',
//     _id: '123',
//     genre: 'Action/Crime'
//   }
// ])


</script>

<template>
  <div
    class="font-body Vuetimeline w-iphone8 h-iphone8 rounded-md flex-col justify-end items-center inline-flex border shrink"
  >
    <div class="Screen p-2 pb-0 rounded-s5 bg-white flex shrink grow overflow-hidden">
      <div
        class="Innerscreen relative rounded-s5 self-stretch grow shrink basis-0 p-2 bg-gradient-to-b from-gray-900 via-sky-700 to-gray-900 shadow-inner justify-center items-center gap-2 flex overflow-clip"
      >
        <div class="Line w-fit h-full py-2">
          <div class="w-0.5 h-full bg-opgr1"></div>
        </div>
        <div
          class="absolute bg-mask1 pointer-events-none bottom-0 left-0 right-0 top-0 h-full w-full z-40 rounded-s5 bg-clip-content"
        ></div>
        <div
          class="CardWrapper flex-col-reverse justify-start items-center gap-2 h-full inline-flex overflow-y-scroll scrollbar-none"
        >
        <TransitionGroup @enter="onEnter"
        v-if="list.responseData != undefined"
            ><itemCard
              v-for="(data, index) in list.responseData"
              :key="data._id"
              :data="data"
              :target="target"
              :data-index="index"
            ></itemCard
          ></TransitionGroup>
        </div>
      </div>
    </div>
    <SearchBar></SearchBar>
  </div>
</template>
