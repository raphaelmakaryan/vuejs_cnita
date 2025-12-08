<script>
import HeaderJudgement from '@/components/header/HeaderJudgement.vue'
import {toRaw} from 'vue'
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'RatingJudgement',
  components: {Notification},
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      movie: [],
      newRating: null,
      valueNotification: null,
      textNotification: null,
      newBody: {
        movie: null,
        user: '/api/users/' + VueCookies.get('idUser'),
        note: null,
      },
    }
  },
  methods: {
    async getMovie() {
      let data = await api({
        url: `movies/${this.valueIdMovie}`,
        method: 'get',
      })
      this.movie = data.data
    },
    async createRating() {
      this.newBody.movie = '/api/movies/' + this.valueIdMovie
      let data = await api({
        url: `ratings`,
        method: 'post',
        data: this.newBody,
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'HomeJudgement'})
      }, 2000)
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avez crée le vote !'
      }
    },
  },
  async mounted() {
    await this.getMovie()
  },
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex flex-column align-items-center">
          <img :src="this.movie.poster" class="img-fluid w-25" :alt="this.movie.title"/>
        </div>
      </div>
    </div>
  </section>

  <form @submit.prevent="createRating">
    <section class="my-5">
      <div class="container">
        <Notification
          v-if="this.valueNotification != null && this.textNotification != null"
          :value="valueNotification"
          :text="textNotification"
        />
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              CREER UN VOTE POUR LE FILM :
              <span class="fw-bold fst-italic">
                {{ this.movie.title }}
              </span>
            </p>
            <hr/>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newRating" class="form-label">Nouvelle note</label>
            <input
              type="number"
              class="form-control"
              id="newRating"
              v-model="newBody.note"
              aria-valuemin="1"
              aria-valuemax="10"
              required
            />
          </div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Mettre a jour</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped></style>
