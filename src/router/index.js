import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue';
import CitiesList from '../views/CitiesList.vue';
import City from "@/components/City.vue";
import CitiesMap from "@/views/CitiesMap.vue";
import Judgement from "@/views/Judgement.vue";
import genreMoviesJudgement from "@/views/GenreMoviesJudgement.vue";
import MovieJudgement from "@/views/MovieJudgement.vue";


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
  {
    path: '/judgement',
    component: Judgement,
  },
  {
    path: '/judgement/genres/:id/movies',
    component: genreMoviesJudgement,
  },
  {
    path: '/judgement/movie/:id',
    component: MovieJudgement,
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})

export default index
