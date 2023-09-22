<script setup></script>
<template>
  <div
    id="loading-screen"
    class="Innerscreen w-full relative shadow-inner rounded-s5 self-stretch grow shrink basis-0 p-2 bg-gray-50 justify-center items-center gap-1.5 flex overflow-clip"
  >
    <span class="loader"></span>
  </div>
</template>
<style>
.loader {
  width: 100px;
  height: 100px;
  border: 5px solid #000000;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
