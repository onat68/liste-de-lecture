<script setup>
</script>

<template>
  <div
    class="font-body w-full max-w-[390px] h-full max-h-[844px] rounded-md flex-col justify-end items-center inline-flex border shrink">
    <router-view name="menubar" />
    <router-view name="cardsview" :key="$route.path" />
    <router-view name="searchbar" :key="$route.path" />
    <router-view name="signup" />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>