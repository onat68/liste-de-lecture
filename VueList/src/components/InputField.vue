<script setup>
import { defineModel } from 'vue';
const props = defineProps({
    label: String,
    name: String,
    required: Boolean,
    type: String
})

const model = defineModel()

</script>

<template>
    <label class="flex flex-col w-full p-1 gap-2 whitespace-nowrap overflow-hidden box-border items-center"
        :for="props.name">{{ label }}
        <input v-model="model" class="flex grow box-border px-2 rounded-sm bg-slate-200 py-1" :type="props.type"
            :id="props.name" :name="props.name" :required="props.required" /></label>
</template>