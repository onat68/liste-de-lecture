<script setup>
import InputField from '../components/InputField.vue';
import FormSubmit from '../components/shared/FormSubmit.vue';

import { ref } from 'vue';

const email = ref("test")
const password = ref("")

async function sendForm() {
    console.log(email)
    try {
        const res = await fetch(
            `http://90.3.112.97:3000/auth/signup/`,
            {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            }
        )
        if (res.status === 201) {
            const data = await res.json()
            console.info(await data)
        } else throw new Error(`Error: ${await res.json()}`)
    } catch (e) { console.error(e) }

}


</script>

<template>
    <form action="http://90.3.112.97:3000/auth/signup/" enctype="application/x-www-form-urlencoded" method="post"
        class="flex flex-col gap-2 h-full w-full p-4 justify-center items-center box-border">
        <InputField v-model="email" :type="'text'" :label="'Email:'" :name="'email'" :required="true" />
        <InputField v-model="password" :type="'password'" :label="'Password:'" :name="'password'" :required="true" />
        <FormSubmit @click="sendForm"
            :styles="'bg-green-400 hover:bg-white text-white hover:text-green-400 border-green-400 border-2'" />
    </form>
</template>