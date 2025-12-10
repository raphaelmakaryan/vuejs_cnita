<script>
import VueCookies from 'vue-cookies'
import {toRaw} from 'vue'
import api from '@/assets/api.js'

export default {
  name: 'MovieConnectedReviewJudgement',
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  props: {
    idMovie: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      reviewUser: null,
    }
  },
  async mounted() {
    let data = await api.get(`movies/${this.idMovie}/reviews`, {
      params: {
        page: 1,
        itemsPerPage: 30,
      },
    })
    if (data.data.totalItems > 0) {
      let backupUserId = []
      data.data.member.forEach((ratings) => {
        backupUserId.push(ratings.user.id)
      })
      const memeUser = backupUserId.some((rating) => rating === parseInt(VueCookies.get('idUser')))
      if (!memeUser) {
        this.reviewUser = true
      }
    } else {
      this.reviewUser = true
    }
  },
}
</script>

<template>
  <div class="col-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center flex-column my-2">
    <div class="cardConnectedChoose p-4">
      <div>
        <p class="fs-4 text-white">Review</p>
        <p class="fs-6 text-secondary">Ajouter un commentaire / une critique au film</p>
      </div>
      <div>
        <router-link
          class="btn btn-primary"
          v-if="reviewUser"
          :to="{ path: '/movie/' + this.idMovie + '/review' }"
        >
          Crée une review
        </router-link>
        <button type="button" class="btn btn-primary" v-else-if="!reviewUser" disabled>
          Crée une review
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
