<script setup>
import { search } from '../search'
import SearchTypeButton from './SearchTypeButton.vue'
import { ref } from 'vue'
const text = ref('')

const types = {
  All: {
    typeName: 'All',
    typeColor: 'bg-rainbow hover:text-rainbow hover:border-none',
    focusColor: 'focus-visible:border-grey-500'
  },
  Album: {
    typeName: 'Album',
    typeColor: 'bg-mdBl hover:text-mdBl hover:border-mdBl',
    focusColor: 'focus-visible:border-mdBl'
  },
  Book: {
    typeName: 'Book',
    typeColor: 'bg-drkRd hover:text-drkRd hover:border-drkRd',
    focusColor: 'focus-visible:border-drkRd'
  },
  Movie: {
    typeName: 'Movie',
    typeColor: 'bg-mdPrpl  hover:text-mdPrpl hover:border-mdPrpl',
    focusColor: 'focus-visible:border-mdPrpl'
  }
}
const currentType = ref(types.All)

const typeMenuIsOpen = ref(false)

function dropdown() {
  typeMenuIsOpen.value = true
  console.log(typeMenuIsOpen.value)
}

function rollup(arg) {
  typeMenuIsOpen.value = false
  currentType.value = arg
  console.log(typeMenuIsOpen.value)
}
</script>

<template>
  <div
    class="SearchBar font-display w-full h-20 p-2 bg-white rounded-[5px] justify-center items-center gap-2 flex"
  >
    <div class="menu flex flex-row gap-2 h-[60px] bottom-0 left-0 z-50">
      <SearchTypeButton
        v-if="typeMenuIsOpen != true"
        @click="dropdown"
        :class="currentType.typeColor"
        :type="currentType.typeName"
      ></SearchTypeButton>

      <template v-if="typeMenuIsOpen">
        <SearchTypeButton
          id="All"
          @click="rollup(types.All)"
          :class="types.All.typeColor"
          :type="types.All.typeName"
        ></SearchTypeButton>
        <SearchTypeButton
          id="Album"
          @click="rollup(types.Album)"
          :class="types.Album.typeColor"
          :type="types.Album.typeName"
        ></SearchTypeButton>
        <SearchTypeButton
          id="Book"
          @click="rollup(types.Book)"
          :class="types.Book.typeColor"
          :type="types.Book.typeName"
        ></SearchTypeButton>
        <SearchTypeButton
          id="Movie"
          @click="rollup(types.Movie)"
          :class="types.Movie.typeColor"
          :type="types.Movie.typeName"
        ></SearchTypeButton
      ></template>
    </div>
    <input
      v-model="text"
      v-show="typeMenuIsOpen != true"
      type="field"
      id="search-field"
      :class="currentType.focusColor"
      class="SearchField focus-visible:outline-none focus-visible:border-2 px-4 py-2 text-2xl font-medium w-full h-full bg-neutral-200 rounded-s5 shadow-inner"
    />
    <button
      @mouseover="onOver"
      @mouseleave="onLeave"
      @click="search.search(text, currentType.typeName)"
      class="Button w-[60px] h-[60px] hover:bg-white hover:border-brGr hover:border-2 hover:fill-brGr transition-transform duration-300 hover:-translate-y-1 hover:shadow-md fill-white bg-brGr rounded-s5 box-border shrink-0 justify-center items-center inline-flex"
    >
      <svg class="w-5 fill-inherit" viewBox="0 0 24 26" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M23.6736 22.115L18.9998 17.2468C18.7889 17.0271 18.5029 16.905 18.2029 16.905H17.4388C18.7326 15.1814 19.5014 13.0134 19.5014 10.655C19.5014 5.04468 15.137 0.498779 9.75071 0.498779C4.36438 0.498779 0 5.04468 0 10.655C0 16.2654 4.36438 20.8113 9.75071 20.8113C12.0149 20.8113 14.0963 20.0105 15.7512 18.6628V19.4587C15.7512 19.7712 15.8683 20.0691 16.0793 20.2888L20.7531 25.157C21.1937 25.616 21.9063 25.616 22.3423 25.157L23.6689 23.7751C24.1096 23.3162 24.1096 22.574 23.6736 22.115ZM9.75071 16.905C6.43641 16.905 3.75027 14.1121 3.75027 10.655C3.75027 7.20288 6.43172 4.40503 9.75071 4.40503C13.065 4.40503 15.7512 7.198 15.7512 10.655C15.7512 14.1072 13.0697 16.905 9.75071 16.905Z"
        />
      </svg>
    </button>
  </div>
</template>
