import { createRouter, createWebHistory } from 'vue-router'

import VueCookies from 'vue-cookies'

import HomeJudgement from '@/views/home/HomeJudgement.vue'
import GenreMoviesJudgementPage from '@/views/GenreMoviesJudgementPage.vue'
import MovieJudgementPage from '@/views/MovieJudgementPage.vue'
import DirectorJudgementPage from '@/views/director/DirectorJudgementPage.vue'
import CastJudgementPage from '@/views/cast/CastJudgementPage.vue'
import ListJudgementPage from '@/views/list/ListJudgementPage.vue'
import UserJudgementPage from '@/views/user/UserJudgementPage.vue'
import LoginPageJudgement from '@/views/login/LoginPage.vue'
import ProfilPageJudgement from '@/views/profil/main/ProfilPage.vue'
import EditProfilPageJudgement from '@/views/profil/main/EditProfilPage.vue'
import EditCollectionPageJudgement from '@/views/profil/collections/EditCollectionPage.vue'
import CreateCollectionPageJudgement from '@/views/profil/collections/CreateCollectionPage.vue'
import EditVotesPageJudgement from '@/views/profil/rating/EditVotesPage.vue'
import EditReviewPageJudgement from '@/views/profil/review/EditReviewPage.vue'
import RatingMoviePageJudgement from '@/views/profil/rating/RatingMoviePage.vue'
import ReviewMoviePageJudgement from '@/views/profil/review/ReviewMoviePage.vue'

const routes = [
  {
    path: '/',
    name: 'HomeJudgement',
    component: HomeJudgement,
  },
  {
    path: '/genres/:id/movies',
    component: GenreMoviesJudgementPage,
  },
  {
    path: '/movie/:id',
    name: 'MovieJudgementPage',
    component: MovieJudgementPage,
  },
  {
    path: '/movie/:id/rating',
    name: 'RatingMovieJudgement',
    component: RatingMoviePageJudgement,
  },
  {
    path: '/movie/:id/review',
    name: 'ReviewMovieJudgement',
    component: ReviewMoviePageJudgement,
  },
  {
    path: '/director/:id',
    component: DirectorJudgementPage,
  },
  {
    path: '/cast/:id',
    component: CastJudgementPage,
  },
  {
    path: '/list/:id',
    name: 'ListJudgementPage',
    component: ListJudgementPage,
  },
  {
    path: '/user/:id',
    component: UserJudgementPage,
  },
  {
    path: '/login',
    name: 'LoginJudgement',
    component: LoginPageJudgement,
  },
  {
    path: '/profil',
    name: 'ProfilJudgement',
    component: ProfilPageJudgement,
  },
  {
    path: '/profil/edit',
    name: 'EditProfilJudgement',
    component: EditProfilPageJudgement,
  },
  {
    path: '/profil/list/:id/edit',
    name: 'EditCollectionJudgement',
    component: EditCollectionPageJudgement,
  },
  {
    path: '/profil/list/create',
    name: 'CreateCollectionJudgement',
    component: CreateCollectionPageJudgement,
  },
  {
    path: '/profil/rating/:id/edit',
    name: 'EditVotesJudgement',
    component: EditVotesPageJudgement,
  },
  {
    path: '/profil/review/:id/edit',
    name: 'EditReviewJudgement',
    component: EditReviewPageJudgement,
  },
]

const rooter = createRouter({
  history: createWebHistory(),
  routes,
})

rooter.beforeEach((to, from, next) => {
  const token = VueCookies.get('tokenUser')
  const userId = VueCookies.get('idUser')
  const cantComeNotConnected = [
    'ProfilPageJudgement',
    'RatingMoviePageJudgement',
    'ReviewMoviePageJudgement',
    'EditProfilPageJudgement',
    'EditCollectionPageJudgement',
    'CreateCollectionPageJudgement',
    'EditVotesPageJudgement',
    'EditReviewPageJudgement',
  ]
  const cantComeConnected = ['LoginPageJudgement']
  if (cantComeNotConnected.includes(to.name) && !token && !userId) {
    return next('/login')
  }
  if (cantComeConnected.includes(to.name) && token && userId) {
    return next('/')
  }
  next()
})

export default rooter
