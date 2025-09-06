import { registerPlugins } from '@/plugins'
import { mask } from 'vue-the-mask'

import App from './App.vue'

import { createApp } from 'vue'

import 'unfonts.css'

const app = createApp(App)

app.directive('mask', mask)
registerPlugins(app)

app.mount('#app')



