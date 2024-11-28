// VUE SETTING
import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/store'

// BOOTSTRAP
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

// ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// INIT
createApp(App).use(store).use(ElementPlus).mount('#app')
