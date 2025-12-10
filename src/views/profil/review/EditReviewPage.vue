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
      let data = await api.get(`reviews/${this.valueIdReview}`, {
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
        this.textNotification = 'Vous avez modifié votre review !'
      }
    },
    async updateReview() {
      let data = await api.patch(`reviews/${this.valueIdReview}`, {
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
              :src="this.dataMovie.poster ? this.dataMovie.poster : 'https://placehold.co/510x510'"
              class="img-fluid h-75"
              :alt="this.dataMovie.title"
            />
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-6 my-2 order-0 order-lg-1">
          <div class="my-2">
            <p class="fs-1 color_yellow text-uppercase">REVIEW <span class="fw-bold">{{
                dataMovie.title
              }}</span>
            </p>
          </div>
          <div class="detail d-flex flex-column p-3">
            <form @submit.prevent="updateReview">
              <div class="my-2">
                <label for="newRating" class="form-label labelMovie mb-2">Nouvelle review</label>
              </div>
              <div class="my-2">
                <input
                  type="text"
                  class="form-control"
                  id="newReview"
                  v-model="this.newBody.content"
                  minlength="3"
                  required
                  :placeholder="this.review.content"
                />
              </div>
              <div class="mb-1 mt-5">
                <button type="submit" class="btn btn-primary w-100" id="buttonReview">Mettre a
                  jour
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
