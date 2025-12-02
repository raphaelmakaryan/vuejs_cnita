import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue';
import CitiesList from '../views/CitiesList.vue';
import City from "@/components/City.vue";
import CitiesMap from "@/components/CitiesMap.vue";


const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/villes',
    component: CitiesList,
  },
  {
    path: '/ville',
    component: City,
  },
  {
    path: '/carte',
    component: CitiesMap,
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

export default index
