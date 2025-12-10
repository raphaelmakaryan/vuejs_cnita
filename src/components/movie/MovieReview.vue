<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import {format} from 'timeago.js'

export default {
  name: 'MovieReview',
  data() {
    return {
      reviewData: [],
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
    let data = await api.get(`movies/${this.idMovie}/reviews`)
    this.reviewData = await data.data
  },
}
</script>

<template>
  <div class="col-12" v-if="this.reviewData.totalItems >= 1" id="reviewMovie">
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 text-uppercase titleSeparation">Reviews</p>
          <hr/>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12 cardConnectedChoose my-2" v-for="review in this.reviewData.member">
          <div class="container-fluid">
            <div class="row my-3">
              <div class="col-6 d-flex flex-row align-items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" class="avatarLittleIcons me-1">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                <router-link
                  :to="{ path: '/user/' + review.user.id }"
                  class="text-decoration-none ms-1 text-white usernameInfos"
                >
                  {{ review.user.username }}
                </router-link>
              </div>
              <div class="col-6 d-flex flex-row align-items-center justify-content-end">
                <p class="fs-6 text-secondary m-0">{{ format(review.user.createdAt) }}</p>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 d-flex flex-row align-items-center">
                <p class="font-monospace text-white">{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
