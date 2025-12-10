<script>
import api from "@/assets/api.js"
import Notification from '@/components/Notification.vue'
import router from "@/router/index.js";
import VueCookies from "vue-cookies";

export default {
  name: 'EditVotesJudgement',
  components: {Notification},
  data() {
    return {
      valueIdVote: this.$route.params.id,
      dataMovie: {},
      newBody: {
        note: 0,
      },
      rating: [],
      valueNotification: null,
      textNotification: null,
      numberStar: 10
    }
  },
  methods: {
    star(index) {
      const starRow = document.getElementById("starRow")
      for (let i = 0; i < this.numberStar; i++) {
        if (i < index) {
          starRow.children[i].classList.add('clicked')
        } else {
          starRow.children[i].classList.remove('clicked')
        }
      }
      this.newBody.note = index
    },
    async getRating() {
      let data = await api.get(`ratings/${this.valueIdVote}`)
      this.rating = data.data
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avez modifié votre vote !'
      }
    },
    async updateRating() {
      let data = await api.patch(`ratings/${this.valueIdVote}`, {
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        },
        data: this.newBody
      })
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
    },
  },
  async mounted() {
    await this.getRating()
    this.dataMovie = {
      title: await this.rating.movie.title,
      poster: await this.rating.movie.poster,
    }
    this.star(this.rating.note)
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
            <p class="fs-1 color_yellow text-uppercase">MODIFIER LE VOTE POUR <span class="fw-bold">{{
                dataMovie.title
              }}</span>
            </p>
          </div>
          <div class="detail d-flex flex-column p-3">
            <form @submit.prevent="updateRating">
              <div class="my-2">
                <label for="newRating" class="form-label labelMovie mb-2">Nouvelle note</label>
              </div>
              <div class="d-flex flex-row my-2" id="starRow">
                <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor"
                     v-for="(index) in this.numberStar" @click="star(index)">
                  <path
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              </div>
              <div class="mb-1 mt-5">
                <button type="submit" class="btn btn-primary w-100">Mettre a jour</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.star-icon {
  width: 50px;
}

.clicked {
  color: var(--color-yellow-hover);
}

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
