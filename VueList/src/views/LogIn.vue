<script setup>
import InputField from '../components/InputField.vue';
import FormSubmit from '../components/shared/FormSubmit.vue';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
const router = useRouter()

const email = ref("test")
const password = ref("")

async function sendForm() {
    console.log(email)
    try {
        const res = await fetch(
            `http://90.3.112.97:3000/auth/login/`,
            {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.value, password: password.value })
            }
        )
        if (res.status === 200) {
            const data = await res.json()
            console.info(await data)
            router.replace({ name: 'home' })
        } else throw new Error(`Error: ${await res.json()}`)
    } catch (e) { console.error(e) }

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