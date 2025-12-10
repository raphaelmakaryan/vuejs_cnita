<script>
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'ReviewJudgement',
  components: {Notification},
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
      let data = await api.get(`movies/${this.valueIdMovie}`)
      this.movie = data.data
    },
    async createRating() {
      this.newBody.movie = '/api/movies/' + this.valueIdMovie
      let data = await api({
        url: '/reviews',
        method: 'POST',
        data: this.newBody,
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      document.getElementById("buttonReview").setAttribute("disabled", "disabled")
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
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
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
      <div class="row">
        <div
          class="order-1 order-lg-0 col-12 col-sm-12 col-md-12 col-lg-6 d-flex flex-column align-items-center largePoster my-2"
        >
          <div class="poster">
            <img
              :src="this.movie.poster ? this.movie.poster : 'https://placehold.co/510x510'"
              class="img-fluid h-75"
              :alt="this.movie.title"
            />
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 my-2 order-0 order-lg-1">
          <div class="my-2">
            <p class="fs-1 color_yellow text-uppercase">REVIEW <span class="fw-bold">{{
                movie.title
              }}</span>
            </p>
          </div>
          <div class="detail d-flex flex-column p-3">
            <form @submit.prevent="createRating">
              <div class="my-2">
                <label for="newRating" class="form-label labelMovie mb-2">Nouvelle review</label>
              </div>
              <div class="my-2">
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
              <div class="mb-1 mt-5">
                <button type="submit" class="btn btn-primary w-100" id="buttonReview">Crée la
                  review
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.largePoster {
  top: 100px;
}

.poster {
  aspect-ratio: 2/3;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-elevated));
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.detail {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.labelMovie {
  font-weight: 600;
  color: var(--color-yellow-primary);
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}
</style>
