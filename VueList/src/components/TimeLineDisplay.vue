<script setup>
import SearchBar from './SearchBar.vue'
import itemCard from './itemCard.vue'

const target = ref('timeline')

import { ref } from 'vue'
const responseData = ref([
  {
    title: 'John Wick: Chapter 4',
    releaseDate: '2023',
    note: 'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.',
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.tmdb.org%2Ft%2Fp%2Fw500%2FkPsRQfoyYgcpbI6hvDQvUSCo0q3.jpg&f=1&nofb=1&ipt=92930009c5415ffb7c7f8e2ce07f42a0bfe0db7cee81c5ba8eec8b3eeeb29171&ipo=images',
    type: 'Movie',
    _id: '123',
    genre: 'Action/Crime'
  },
  {
    title: 'Un bouquin',
    releaseDate: '2023',
    note: 'Un bouquin de ouf',
    img: '',
    type: 'Book',
    _id: '123',
    genre: 'Action/Crime'
  }
])

// const xhr = new XMLHttpRequest()

// function loadTimeline() {
//   xhr.open('GET', `http://localhost:3000/api/all`)
//   xhr.send()
//   xhr.responseType = 'json'
//   xhr.onload = () => {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // console.log(films)
//       return xhr.response
//     } else {
//       console.log(`Error: ${xhr.status}`)
//     }
//   }
// }

// const responseData = ref(loadTimeline())
</script>

<template>
  <div
    class="font-body Property1Vuetimeline w-iphone8 h-iphone8 rounded-md flex-col justify-center items-center inline-flex border border-gray-400"
  >
    <div class="Screen p-2 pb-0 rounded-s5 bg-white w-full h-full">
      <div
        class="Innerscreen rounded-s5 w-full h-full self-stretch grow shrink basis-0 p-2 bg-gradient-to-b from-gray-900 via-sky-700 to-gray-900 shadow-inner justify-center items-center gap-2 flex"
      >
        <div class="Line w-fit h-full py-2">
          <div class="w-0.5 h-full bg-opgr1"></div>
        </div>
        <div class="Frame28 w-full h-full flex-col justify-center items-center gap-2 inline-flex">
          <itemCard
            v-for="data in responseData"
            :key="data._id"
            :data="data"
            :target="target"
          ></itemCard>
        </div>
      </div>
    </div>
    <SearchBar></SearchBar>
  </div>
</template>
