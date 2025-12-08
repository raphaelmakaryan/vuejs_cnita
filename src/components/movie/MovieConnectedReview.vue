<script>
import VueCookies from 'vue-cookies'
import { toRaw } from 'vue'
import api from "@/assets/api.js"
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
    let data = toRaw(
      await api(
        'GET',
        `movies/${this.idMovie}/reviews?page=1&itemsPerPage=30`,
        '',
        undefined,
        '',
      ),
    )
    if (data.totalItems > 0) {
      let backupUserId = []
      data.member.forEach((ratings) => {
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
  <div class="col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column align-items-center">
    <router-link
      class="btn btn-success"
      v-if="reviewUser"
      :to="{ path: '/movie/' + this.idMovie + '/review' }"
    >
      Crée une review
    </router-link>
    <button type="button" class="btn btn-success" v-else-if="!reviewUser" disabled>
      Crée une review
    </button>
  </div>
</template>

<style scoped></style>
