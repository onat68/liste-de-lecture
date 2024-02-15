<script setup>
import SearchBar from '../components/search/SearchBar.vue'


</script>

<template>
  <div
    class="font-body Vuetimeline w-full max-w-[390px] h-full max-h-[844px] rounded-md flex-col justify-end items-center inline-flex border shrink">
    <div class="Screen w-full h-full p-1.5 pb-0 rounded-s5 bg-white flex shrink grow overflow-hidden">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in" @after-enter="afterEnter">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>

    <SearchBar />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>