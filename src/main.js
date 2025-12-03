//import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import VueSplide from '@splidejs/vue-splide';

const app = createApp(App)
app.use(VueCookies, {expires: "1h"})
app.use(router)
app.use(VueSplide);
app.mount('#app')
