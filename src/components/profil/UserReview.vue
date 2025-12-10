<script>
import {format} from 'timeago.js'
import {toRaw} from 'vue'
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import Notification from '@/components/Notification.vue'
import router from '@/router/index.js'

export default {
  name: 'UserReview',
  components: {Notification},
  data() {
    return {
      review: [],
      valueNotification: null,
      textNotification: null,
    }
  },
  methods: {
    format,
    async functionDelete(id) {
      let data = await api.delete(`reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${VueCookies.get('tokenUser')}`
        }
      })
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
        this.textNotification = `Vous avez supprimez la review pour le film : ${this.review.member.title} !`
      }
    },
  },
  async mounted() {
    let data = await api.get(`users/${VueCookies.get('idUser')}/reviews`)
    this.review = data.data
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.review).length >= 1 && this.review.member.length >= 1"
  >
    <div class="container">
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3 titleSeparation m-0">VOS REVIEWS</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between p-2 my-2 lotItemsProfil"
          v-for="review in this.review.member"
        >
          <div>
            <router-link :to="{ path: '/movie/' + review.movie.id }" class="text-decoration-none">
              <p class="fs-6 text-decoration-underline fw-bold text-white">
                {{ review.movie.title }}
              </p>
            </router-link>
            <p class="font-monospace">{{ review.content }}</p>
          </div>
          <div>
            <router-link
              :to="{ path: '/profil/review/' + review.id + '/edit' }"
              class="btn btn-secondary mx-1"
            >
              <i class="bi bi-pencil"></i>
            </router-link>
            <button
              type="button"
              class="btn btn-danger mx-1"
              @click="functionDelete(review.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
