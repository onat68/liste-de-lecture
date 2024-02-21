<script setup>
import { useItemsStore } from '../../stores/ItemsStore'
import { useRoute, useRouter } from 'vue-router';
import CancelButton from './buttons/CancelButton.vue';
import SearchButton from './buttons/SearchButton.vue'
import searchField from './searchField.vue'
import TypePicker from './TypePicker.vue'

const itemsStore = useItemsStore()
const route = useRoute()
const router = useRouter()

function navigateToSearch() {
  router.replace({ name: "search", params: { query: itemsStore.query } })
}

</script>

<template>
  <div
    class="SearchBar font-display h-fit w-full p-1.5 bg-white rounded-[5px] justify-center items-center gap-1.5 flex overflow-visible z-40">
    <transition name="picker" mode="out-in">
      <TypePicker />
    </transition>

    <transition appear name="cancel">
      <CancelButton v-show="(route.name === 'search')" />
    </transition>

    <label for="searchField" class="absolute invisible pointer-events-none">Search field</label>

    <searchField :id="'searchField'" v-model="itemsStore.query" :class="itemsStore.pickedType.focusColor" />

    <transition name="divrev">
      <SearchButton v-show="!itemsStore.pickerOpened" :class='"relative"' @click="navigateToSearch" />
    </transition>
  </div>
</template>

<style>
.picker-enter-active,
.picker-leave-active,
.cancel-enter-active,
.cancel-leave-active {
  transition: all 0.3s ease;
}

.picker-enter-from,
.picker-leave-to,
.cancel-enter-from,
.cancel-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.divrev-enter-active,
.divrev-leave-active {
  transition: all 0.3s ease;
}

.divrev-enter-from,
.divrev-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
