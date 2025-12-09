<script>
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
    clickedStar(index) {
      const starRow = document.getElementById("starRow")
      for (let i = 0; i < 5; i++) {
        if (i < index) {
          starRow.children[i].classList.add('clicked')
        } else {
          starRow.children[i].classList.remove('clicked')
        }
      }
      this.newBody.note = index
    },
    async getMovie() {
      let data = await api({
        url: `movies/${this.valueIdMovie}`,
        method: 'get',
      })
      this.movie = data.data
    },
    async createRating() {
      if (this.newBody.note >= 1) {
        this.valueNotification = null
        this.textNotification = null
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
      } else {
        await this.forNotification({
          status: 'error',
          detail : "Veuillez minimum choisir une êtoile."
        })
      }
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
            <div class="d-flex flex-row" id="starRow">
              <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor"
                   v-for="(index) in 5" @click="clickedStar(index)">
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                />
              </svg>
            </div>
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
.star-icon {
  width: 50px;
}

.clicked {
  color: var(--color-yellow-hover);
}
</style>
