<script>
import VueCookies from 'vue-cookies'
import api from "@/assets/api.js"
import { toRaw } from 'vue'

export default {
  name: 'MovieConnectedRatingJudgement',
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
      ratingsUser: null,
    }
  },
  async mounted() {
    let data = toRaw(
      await api(
        'GET',
        `movies/${this.idMovie}/ratings?page=1&itemsPerPage=30`,
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
        this.ratingsUser = true
      }
    } else {
      this.ratingsUser = true
    }
  },
}
</script>

<template>
  <div class="col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column align-items-center">
    <router-link
      class="btn btn-success"
      v-if="ratingsUser"
      :to="{ path: '/movie/' + this.idMovie + '/rating' }"
    >
      Voter le film
    </router-link>
    <button type="button" class="btn btn-success" v-else-if="!ratingsUser" disabled>
      Voter le film
    </button>
  </div>
</template>

<style scoped></style>
