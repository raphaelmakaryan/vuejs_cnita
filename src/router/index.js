import {createRouter, createWebHistory} from 'vue-router'

import VueCookies from "vue-cookies";

import HomeHome from '@/views/Home.vue';
import CitiesList from '../views/others/CitiesList.vue';
import CitiesMap from "@/views/others/CitiesMap.vue";
import HomeJudgement from "@/views/judgement/HomeJudgement.vue";
import GenreMoviesJudgementPage from "@/views/judgement/GenreMoviesJudgementPage.vue";
import MovieJudgementPage from "@/views/judgement/MovieJudgementPage.vue";
import DirectorJudgementPage from "@/views/judgement/DirectorJudgementPage.vue";
import CastJudgementPage from "@/views/judgement/CastJudgementPage.vue";
import ListJudgementPage from "@/views/judgement/ListJudgementPage.vue";
import UserJudgementPage from "@/views/judgement/UserJudgementPage.vue";
import LoginPageJudgement from "@/views/judgement/LoginPage.vue";
import ProfilPageJudgement from "@/views/judgement/user/ProfilPage.vue";
import EditProfilPageJudgement from "@/views/judgement/user/EditProfilPage.vue";
import EditCollectionPageJudgement from "@/views/judgement/user/EditCollectionPage.vue";
import CreateCollectionPageJudgement from "@/views/judgement/user/CreateCollectionPage.vue";
import EditVotesPageJudgement from "@/views/judgement/user/EditVotesPage.vue";
import EditReviewPageJudgement from "@/views/judgement/user/EditReviewPage.vue";
import RatingMoviePageJudgement from "@/views/judgement/RatingMoviePage.vue";
import ReviewMoviePageJudgement from "@/views/judgement/ReviewMoviePage.vue";


const routes = [
  {
    path: '/',
    component: HomeHome,
  },
  {
    path: '/villes',
    component: CitiesList,
  },
  {
    path: '/carte',
    component: CitiesMap,
  },
  {
    path: '/judgement',
    name: 'HomeJudgement',
    component: HomeJudgement,
  },
  {
    path: '/judgement/genres/:id/movies',
    component: GenreMoviesJudgementPage,
  },
  {
    path: '/judgement/movie/:id',
    component: MovieJudgementPage,
  },
  {
    path: '/judgement/movie/:id/rating',
    name: "RatingMovieJudgement",
    component: RatingMoviePageJudgement,
  },
  {
    path: '/judgement/movie/:id/review',
    name: "ReviewMovieJudgement",
    component: ReviewMoviePageJudgement,
  },
  {
    path: '/judgement/director/:id',
    component: DirectorJudgementPage,
  },
  {
    path: '/judgement/cast/:id',
    component: CastJudgementPage,
  },
  {
    path: '/judgement/list/:id',
    component: ListJudgementPage,
  },
  {
    path: '/judgement/user/:id',
    component: UserJudgementPage,
  },
  {
    path: '/judgement/login',
    name: 'LoginJudgement',
    component: LoginPageJudgement,
  },
  {
    path: '/judgement/profil',
    name: 'ProfilJudgement',
    component: ProfilPageJudgement,
  },
  {
    path: '/judgement/profil/edit',
    name: 'EditProfilJudgement',
    component: EditProfilPageJudgement,
  },
  {
    path: '/judgement/profil/list/:id/edit',
    name: 'EditCollectionJudgement',
    component: EditCollectionPageJudgement,
  },
  {
    path: '/judgement/profil/list/create',
    name: 'CreateCollectionJudgement',
    component: CreateCollectionPageJudgement,
  },
  {
    path: '/judgement/profil/rating/:id/edit',
    name: 'EditVotesJudgement',
    component: EditVotesPageJudgement,
  },
  {
    path: '/judgement/profil/review/:id/edit',
    name: 'EditReviewJudgement',
    component: EditReviewPageJudgement,
  }
]

const rooter = createRouter({
  history: createWebHistory(),
  routes,
})


rooter.beforeEach((to, from, next) => {
  const token = VueCookies.get('tokenUser')
  const userId = VueCookies.get("idUser")
  const cantComeNotConnected = ["ProfilPageJudgement", "RatingMoviePageJudgement", "ReviewMoviePageJudgement", "EditProfilPageJudgement", "EditCollectionPageJudgement", "CreateCollectionPageJudgement", "EditVotesPageJudgement", "EditReviewPageJudgement"]
  const cantComeConnected = ["LoginPageJudgement"]
  if (cantComeNotConnected.includes(to.name) && !token && !userId) {
    return next('/login')
  }
  if (cantComeConnected.includes(to.name) && token && userId) {
    return next('/judgement/profil')
  }
  next()
})

export default rooter
