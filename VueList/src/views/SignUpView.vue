<script setup>
import InputField from '../components/InputField.vue';
import FormSubmit from '../components/shared/FormSubmit.vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const router = useRouter()
const auth = useAuthStore()

const email = ref("")
const password = ref("")

async function sendForm() {
    await auth.signup(email.value, password.value)

    if (auth.token) {
        router.replace({ name: "home" })
    }
}



</script>

<template>
    <form class="flex flex-col gap-2 h-full w-full p-4 justify-center items-center box-border">
        <InputField v-model="email" :type="'text'" :label="'Email:'" :name="'email'" :required="true" />
        <InputField v-model="password" :type="'password'" :label="'Password:'" :name="'password'" :required="true" />
        <FormSubmit @click="sendForm" :text="'Sign up'"
            :styles="'bg-green-400 hover:bg-white text-white hover:text-green-400 border-green-400 border-2'" />
    </form>
</template>