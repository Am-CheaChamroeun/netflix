import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './router'
import './style/style.css'
import App from './App.vue'
import { initializeTheme } from './libs/theme'

initializeTheme()
createApp(App).use(router).use(VueQueryPlugin).mount('#app')
