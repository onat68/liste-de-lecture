<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    name: String,
    navType: String,
    href: String
})

function navigateToRoute() {
    router.replace({ name: props.href })
}



</script>
<template>
    <li class="flex w-fit h-fit pointer-events-none leading-none">
        <a class="w-fit h-fit px-1 text-xs hover:cursor-pointer hover:text-red-800 pointer-events-auto"
            @click="navigateToRoute">{{ props.name }}</a>
    </li>
</template>