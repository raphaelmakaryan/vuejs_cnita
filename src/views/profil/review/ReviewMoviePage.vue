<script>
import HeaderJudgement from '@/components/header/HeaderJudgement.vue'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'ReviewJudgement',
  components: { Notification },
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      movie: [],
      valueNotification: null,
      textNotification: null,
      newBody: {
        movie: null,
        user: '/api/users/' + VueCookies.get('idUser'),
        content: null,
      },
    }
  },
  methods: {
    async getMovie() {
      this.movie = toRaw(
        await JudgementAPI.mounted('GET', `movies/${this.valueIdMovie}`, '', undefined, ''),
      )
    },
    async createRating() {
      this.newBody.movie = '/api/movies/' + this.valueIdMovie
      await this.forNotification(
        await JudgementAPI.mounted(
          'POST',
          `reviews`,
          this.newBody,
          undefined,
          VueCookies.get('tokenUser'),
        ),
      )
      setTimeout(() => {
        router.push({ name: 'ProfilJudgement' })
      }, 2000)
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avez crée la review !'
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
          <img :src="this.movie.poster" class="img-fluid w-25" :alt="this.movie.title" />
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
              CREER UNE REVIEW POUR LE FILM :
              <span class="fw-bold fst-italic">
                {{ this.movie.title }}
              </span>
            </p>
            <hr />
          </div>
        </div>
        <div class="row my-2">
          <div class="col-12">
            <label for="newReview" class="form-label">Nouvelle review</label>
            <input
              type="text"
              class="form-control"
              id="newReview"
              v-model="newBody.content"
              minlength="5"
              required
              placeholder="Ce film étais géniale !"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Crée la review</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped></style>
