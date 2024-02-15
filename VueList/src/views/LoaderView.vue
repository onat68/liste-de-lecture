<template>
  <span class="loader absolute top-2/4 left-2/4 pointer-events-none"></span>
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
