import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载 svg 图标
import 'virtual:svg-icons-register'

// unocss
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'

// 全局样式
import '@/styles/main.css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
