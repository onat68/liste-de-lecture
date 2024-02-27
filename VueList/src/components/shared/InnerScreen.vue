<script setup>
import MaskOverlay from './MaskOverlay.vue';
import CardsWrapper from '../cards/CardsWrapper.vue';
</script>

<template>
    <div :class="{ 'bg-timeline': ($route.name !== 'search'), 'bg-search': ($route.name === 'search') }"
        class="w-full relative rounded-s5 self-stretch grow shrink basis-0 px-2 shadow-inner justify-center items-center gap-2 flex overflow-clip">
        <MaskOverlay />
        <CardsWrapper />
    </div>
</template>