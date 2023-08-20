<script setup>
import { search } from '../search'
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <div
    class="SearchBar w-full h-20 p-2 bg-white rounded-[5px] justify-center items-center gap-2 flex"
  >
    <button
      class="Button w-[60px] h-[60px] box-border pl-[9px] pr-[7px] bg-mdBl fill-white hover:bg-white hover:fill-mdBl hover:border-mdBl transition-transform duration-300 hover:-translate-y-1 hover:shadow-md hover:border-2 rounded-s5 shrink-0 justify-center items-center inline-flex"
    >
      <svg class="fill-inherit w-5" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg">
        <path
          class="fill-inherit"
          d="M23.8623 9.50388L20.8446 14.677C20.6098 15.0796 20.2735 15.4136 19.8694 15.6457C19.4652 15.8779 19.0073 16 18.5412 16H1.87604C1.10425 16 0.623375 15.1628 1.01225 14.4961L4.02992 9.323C4.26476 8.92042 4.60102 8.58641 5.00517 8.35428C5.40932 8.12215 5.86726 8 6.33333 8H22.9985C23.7703 8 24.2512 8.83721 23.8623 9.50388ZM6.33333 6.66667H20V4.66667C20 3.56208 19.1046 2.66667 18 2.66667H11.3333L8.66667 0H2C0.895417 0 0 0.895417 0 2V13.5853L2.87821 8.65117C3.59225 7.42708 4.91621 6.66667 6.33333 6.66667Z"
        />
      </svg>
    </button>
    <input
      v-model="text"
      type="field"
      id="search-field"
      class="SearchField focus-visible:outline-none focus-visible:border-mdBl focus-visible:border-2 px-4 py-2 text-2xl font-display font-medium w-full h-full bg-neutral-200 rounded-s5 shadow-inner"
    />
    <button
      @mouseover="onOver"
      @mouseleave="onLeave"
      @click="search.triggerSearch()"
      class="Button w-[60px] h-[60px] hover:bg-white hover:border-brGr hover:border-2 hover:fill-brGr transition-transform duration-300 hover:-translate-y-1 hover:shadow-md fill-white bg-brGr rounded-s5 box-border shrink-0 justify-center items-center inline-flex"
    >
      <svg
        class="w-5 fill-inherit"
        viewBox="0 0 24 26"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.6736 22.115L18.9998 17.2468C18.7889 17.0271 18.5029 16.905 18.2029 16.905H17.4388C18.7326 15.1814 19.5014 13.0134 19.5014 10.655C19.5014 5.04468 15.137 0.498779 9.75071 0.498779C4.36438 0.498779 0 5.04468 0 10.655C0 16.2654 4.36438 20.8113 9.75071 20.8113C12.0149 20.8113 14.0963 20.0105 15.7512 18.6628V19.4587C15.7512 19.7712 15.8683 20.0691 16.0793 20.2888L20.7531 25.157C21.1937 25.616 21.9063 25.616 22.3423 25.157L23.6689 23.7751C24.1096 23.3162 24.1096 22.574 23.6736 22.115ZM9.75071 16.905C6.43641 16.905 3.75027 14.1121 3.75027 10.655C3.75027 7.20288 6.43172 4.40503 9.75071 4.40503C13.065 4.40503 15.7512 7.198 15.7512 10.655C15.7512 14.1072 13.0697 16.905 9.75071 16.905Z"
        />
      </svg>
    </button>
  </div>
</template>
