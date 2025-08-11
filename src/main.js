// Plugins
import { registerPlugins } from '@/plugins'
import Toasted from 'vue-toasted'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)


    Vue.use(Toasted)
registerPlugins(app)

app.mount('#app')
