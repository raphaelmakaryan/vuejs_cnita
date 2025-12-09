<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import { format } from 'timeago.js'

export default {
  name: 'MovieRating',
  data() {
    return {
      ratingData: [],
    }
  },
  props: {
    idMovie: {
      type: String,
      required: true,
    },
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  methods: {
    format,
  },
  async mounted() {
    let data = await api({
      url: `movies/${this.idMovie}/ratings`,
      method: 'get',
      params: {
        page: '1',
        itemsPerPage: '30',
      },
    })
    this.ratingData = data.data
  },
}
</script>

<template>
  <div class="col-12" v-if="this.ratingData.totalItems >= 1" id="ratingMovie">
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 text-uppercase titleSeparation">Votes Récents</p>
          <hr />
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12 card my-2" v-for="rating in this.ratingData.member">
          <div class="container-fluid">
            <div class="row my-3">
              <div class="col-6 d-flex flex-row align-items-center">
                <p class="fs-5 m-0 text-decoration-none fw-bold text-white d-flex flex-row align-items-center">
                  <svg class="star-icon me-1" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                  {{ rating.note }}/10
                </p>
              </div>
              <div class="col-6 d-flex flex-row align-items-center justify-content-end">
                <p class="fs-6 text-secondary m-0">{{ format(rating.user.createdAt) }}</p>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 d-flex flex-row align-items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" class="user me-1">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                <router-link
                  :to="{ path: '/user/' + rating.user.id }"
                  class="text-decoration-none ms-1 username"
                >
                  {{ rating.user.username }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
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

.user {
  width: 40px;
  height: 40px;
  min-width: 40px;
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-yellow-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-yellow-primary);
}

.username {
  color: white;
}

.username:hover {
  color: var(--color-yellow-hover);
}

.star-icon{
  width: 24px;
  height: 24px;
  color: var(--color-yellow-primary);
}
</style>
