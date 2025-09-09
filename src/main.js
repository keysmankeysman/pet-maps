import { registerPlugins } from '@/plugins'
import Vue3Toastify from 'vue3-toastify'
import { mask } from 'vue-the-mask'

import App from './App.vue'

import { createApp } from 'vue'

import 'unfonts.css'

const app = createApp(App)

app.use(Vue3Toastify, { autoClose: 3000 })
app.directive('mask', mask)
registerPlugins(app)

app.mount('#app')



