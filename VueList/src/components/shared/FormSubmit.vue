<script setup>

const props = defineProps({ styles: String })

</script>

<template>
    <button type="button" :class="props.styles"
        class="w-fit h-fit rounded-sm px-2 py-1 box-border hover:scale-105 transition-all duration-200 shadow-sm leading-tight shadow-slate-400">Submit</button>
</template>