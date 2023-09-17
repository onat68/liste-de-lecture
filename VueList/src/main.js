import './assets/styles.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)
    .use(createPinia())


app.config.performance = true;
app.mount('#app')
