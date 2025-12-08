<script>
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'EditReviewJudgement',
  components: {Notification},
  data() {
    return {
      valueIdReview: this.$route.params.id,
      dataMovie: {},
      newBody: {
        content: '',
      },
      review: [],
      newReview: null,
      valueNotification: null,
      textNotification: null,
    }
  },
  methods: {
    async getReview() {
      let data = await api({
        url: `reviews/${this.valueIdReview}`,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      this.review = data.data
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avec modifié votre review !'
      }
    },
    async updateReview() {
      let data = await api({
        url: `reviews/${this.valueIdReview}`,
        method: 'get',
        data: this.newBody,
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
    },
  },
  async mounted() {
    await this.getReview()
    this.dataMovie = {
      title: await this.review.movie.title,
      poster: await this.review.movie.poster,
    }
  },
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex flex-column align-items-center">
          <img :src="this.dataMovie.poster" class="img-fluid w-25" :alt="this.dataMovie.title"/>
        </div>
      </div>
    </div>
  </section>

  <form @submit.prevent="updateReview">
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
              MODIFIER LA REVIEW POUR LE FILM :
              <span class="fw-bold fst-italic">
                {{ this.dataMovie.title }}
              </span>
            </p>
            <hr/>
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
              minlength="3"
              required
              :placeholder="this.review.content"
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

<style scoped>
@import 'bootstrap-icons/font/bootstrap-icons';
</style>
