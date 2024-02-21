import "./assets/styles.css"

import { createPinia } from "pinia"
import { createApp } from "vue"
import router from "./router/index.js"
import App from "./App.vue"

const pinia = createPinia()

const app = createApp(App).use(router).use(pinia)

app.config.performance = true
app.mount("#app")
