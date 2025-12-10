import {createRouter, createWebHistory} from 'vue-router'
import VueCookies from 'vue-cookies'
import HomeJudgement from '@/views/home/HomeJudgement.vue'
import GenreMoviesJudgementPage from '@/views/genre/GenreMoviesJudgementPage.vue'
import MovieJudgementPage from '@/views/movie/MovieJudgementPage.vue'
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
import RatingMoviePageJudgement from '@/views/movie/RatingMoviePage.vue'
import ReviewMoviePageJudgement from '@/views/movie/ReviewMoviePage.vue'
import NotFound from "@/views/NotFound.vue";

function isAuthenticate() {
  if (!VueCookies.get('tokenUser') && !VueCookies.get('idUser')) {
    return {name: "LoginJudgement"}
  }
}

function isAuthenticatedButCantCome() {
  if (VueCookies.get('tokenUser') && VueCookies.get('idUser')) {
    return {name: "HomeJudgement"}
  }
}

const routes = [
  {
    path: '/:pathMatch(.*)',
    component: NotFound
  },
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
    path: '/movie/:id/rating',
    name: 'RatingMovieJudgement',
    component: RatingMoviePageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/movie/:id/review',
    name: 'ReviewMovieJudgement',
    component: ReviewMoviePageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/login',
    name: 'LoginJudgement',
    component: LoginPageJudgement,
    beforeEnter: [isAuthenticatedButCantCome]
  },
  {
    path: '/profil',
    name: 'ProfilJudgement',
    component: ProfilPageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/profil/edit',
    name: 'EditProfilJudgement',
    component: EditProfilPageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/profil/list/:id/edit',
    name: 'EditCollectionJudgement',
    component: EditCollectionPageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/profil/list/create',
    name: 'CreateCollectionJudgement',
    component: CreateCollectionPageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/profil/rating/:id/edit',
    name: 'EditVotesJudgement',
    component: EditVotesPageJudgement,
    beforeEnter: [isAuthenticate]
  },
  {
    path: '/profil/review/:id/edit',
    name: 'EditReviewJudgement',
    component: EditReviewPageJudgement,
    beforeEnter: [isAuthenticate]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
