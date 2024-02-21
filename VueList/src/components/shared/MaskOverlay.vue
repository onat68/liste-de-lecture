<script setup>

</script>

<template>
    <div :class="{ 'bg-mask1': ($route.name !== 'search'), 'bg-mask2': ($route.name === 'search') }"
        class="absolute pointer-events-none bottom-0 left-0 right-0 top-0 h-full w-full z-40 rounded-s5 bg-clip-content">
    </div>
</template>