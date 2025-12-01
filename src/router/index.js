import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue';
import City from '../views/CitiestList.vue';


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/city',
    component: City,
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

export default index
