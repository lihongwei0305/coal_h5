import {createApp} from 'vue'

import App from './App.vue'
import 'virtual:uno.css'
import '@/assets/css/global.scss'
import {usePlugins} from "@/utils/usePlugins.js";

const app = createApp(App)
usePlugins(app);
app.mount('#app')
