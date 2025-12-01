import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue';
import CitiestList from '../views/CitiestList.vue';
import City from "@/components/City.vue";


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/villes',
    component: CitiestList,
  },
  {
    path: '/ville',
    component: City,
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

export default index
