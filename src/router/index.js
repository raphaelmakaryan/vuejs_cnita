import {createRouter, createWebHistory} from 'vue-router'

import Home from '../views/Home.vue';
import CitiesList from '../views/others/CitiesList.vue';
import City from "@/components/others/City.vue";
import CitiesMap from "@/views/others/CitiesMap.vue";
import Judgement from "@/views/judgement/Judgement.vue";
import genreMoviesJudgement from "@/views/judgement/GenreMoviesJudgement.vue";
import MovieJudgement from "@/views/judgement/MovieJudgement.vue";
import DirectorJudgement from "@/views/judgement/DirectorJudgement.vue";
import CastJudgement from "@/views/judgement/CastJudgement.vue";
import ListJudgement from "@/views/judgement/ListJudgement.vue";
import UserJudgement from "@/views/judgement/UserJudgement.vue";
import LoginJudgement from "@/views/judgement/Login.vue";
import VueCookies from "vue-cookies";
import ProfilJudgement from "@/views/judgement/user/Profil.vue";
import AllUser from "@/views/judgement/AllUser.vue";
import EditProfilJudgement from "@/views/judgement/user/EditProfil.vue";
import EditCollectionJudgement from "@/views/judgement/user/EditCollection.vue";
import CreateCollectionJudgement from "@/views/judgement/user/CreateCollection.vue";
import EditVotesJudgement from "@/views/judgement/user/EditVotes.vue";
import EditReviewJudgement from "@/views/judgement/user/EditReview.vue";


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
    name: 'HomeJudgement',
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
  {
    path: '/judgement/director/:id',
    component: DirectorJudgement,
  },
  {
    path: '/judgement/cast/:id',
    component: CastJudgement,
  },
  {
    path: '/judgement/list/:id',
    component: ListJudgement,
  },
  {
    path: '/judgement/user/:id',
    component: UserJudgement,
  },
  {
    path: '/judgement/login',
    name: 'LoginJudgement',
    component: LoginJudgement,
  },
  {
    path: '/judgement/profil',
    name: 'ProfilJudgement',
    component: ProfilJudgement,
  },
  {
    path: '/judgement/profil/edit',
    name: 'EditProfilJudgement',
    component: EditProfilJudgement,
  },
  {
    path: '/judgement/profil/list/:id/edit',
    name: 'EditCollectionJudgement',
    component: EditCollectionJudgement,
  },
  {
    path: '/judgement/profil/list/create',
    name: 'CreateCollectionJudgement',
    component: CreateCollectionJudgement,
  },
  {
    path: '/judgement/profil/rating/:id/edit',
    name: 'EditVotesJudgement',
    component: EditVotesJudgement,
  },
  {
    path: '/judgement/profil/review/:id/edit',
    name: 'EditReviewJudgement',
    component: EditReviewJudgement,
  },
  {
    path: '/judgement/all-users',
    component: AllUser,
  },
]

const index = createRouter({
  history: createWebHistory(),
  routes,
})


index.beforeEach((to, from, next) => {
  const token = VueCookies.get('tokenUser')
  const userId = VueCookies.get("idUser")
  const cantComeNotConnected = ["ProfilJudgement"]
  const cantComeConnected = ["LoginJudgement"]
  if (cantComeNotConnected.includes(to.name) && !token && !userId) {
    return next('/login')
  }
  if (cantComeConnected.includes(to.name) && token && userId) {
    return next('/judgement/profil')
  }
  next()
})

export default index
