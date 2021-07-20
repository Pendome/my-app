import { createApp } from 'vue'
import element from '@/libs/element-ui/index'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import 'element-plus/lib/theme-chalk/index.css'
import '@/assets/scss/global.scss'

const app = createApp(App)
element(app)
app.use(router).use(store).mount('#app')
