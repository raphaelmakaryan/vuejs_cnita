import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "@/assets/style.css"
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VueSplide from '@splidejs/vue-splide'

const app = createApp(App)
app.use(VueCookies, { expires: '1h' })
app.use(router)
app.use(VueSplide)
app.mount('#app')
