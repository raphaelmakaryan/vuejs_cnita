<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import {toRaw} from 'vue'

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
    let data = await api.get(`movies/${this.idMovie}/ratings`, {
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
        this.ratingsUser = true
      }
    } else {
      this.ratingsUser = true
    }
  },
}
</script>

<template>
  <div class="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
    <div class="card p-4">
      <div>
        <p class="fs-4 text-white">Votes</p>
        <p class="fs-6 text-secondary">Évaluez ce film</p>
      </div>
      <div>
        <router-link
          class="btn btn-primary"
          v-if="ratingsUser"
          :to="{ path: '/movie/' + this.idMovie + '/rating' }"
        >
          Voter maintenant
        </router-link>
        <button type="button" class="btn btn-primary" v-else-if="!ratingsUser" disabled>
          Voter maintenant
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--color-yellow-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
</style>
