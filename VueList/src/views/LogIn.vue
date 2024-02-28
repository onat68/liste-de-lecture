<script setup>
import InputField from '../components/InputField.vue';
import FormSubmit from '../components/shared/FormSubmit.vue';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
const router = useRouter()
const auth = useAuthStore()

const email = ref("")
const password = ref("")


async function sendForm() {
    await auth.login(email.value, password.value)

    if (auth.user) {
        router.replace({ name: "home" })
    }
}

</script>

<template>
    <form class="flex flex-col gap-2 h-full w-full p-4 justify-center items-center box-border">
        <InputField v-model="email" :type="'text'" :label="'Email:'" :name="'email'" :required="true" />
        <InputField v-model="password" :type="'password'" :label="'Password:'" :name="'password'" :required="true" />
        <FormSubmit @click="sendForm" :text="'Log-in'"
            :styles="'bg-green-400 hover:bg-white text-white hover:text-green-400 border-green-400 border-2'" />
    </form>
</template>