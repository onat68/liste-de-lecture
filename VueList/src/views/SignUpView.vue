<script setup>
import InputField from '../components/InputField.vue';
import FormSubmit from '../components/shared/FormSubmit.vue';
import { ref } from 'vue';

const email = ref('')
const pwd = ref('')
const pwdConf = ref('')

async function sendForm() {
    if (pwd.value === pwdConf.value) {

        try {
            const res = await fetch(
                `http://90.3.112.97:3000/user/signup/`,
                {
                    method: "POST",
                    headers: { "Accept": "application/json", "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email.value, password: pwd.value })
                }
            )
            if (res.status === 201) {
                const data = await res.json()
                console.info(await data)
            } else throw new Error(`Error: ${await res.json()}`)

        } catch (e) { console.error(e) }
    }
}


</script>

<template>
    <form class="flex flex-col gap-2 h-full w-full p-4 justify-center items-center box-border">
        <InputField v-model="email" :type="'text'" :label="'Email:'" :name="'email'" :required="true" />
        <InputField v-model="pwd" :type="'password'" :label="'Password:'" :name="'password'" :required="true" />
        <InputField v-model="pwdConf" :type="'password'" :label="'Confirm password:'" :name="'passwordConf'"
            :required="true" />
        <FormSubmit @click="sendForm"
            :styles="'bg-green-400 hover:bg-white text-white hover:text-green-400 border-green-400 border-2'" />
    </form>
</template>