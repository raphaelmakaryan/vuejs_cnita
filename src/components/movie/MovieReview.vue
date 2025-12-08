<script>
import VueCookies from 'vue-cookies'
import {toRaw} from 'vue'
import api from "@/assets/api.js"
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
    let data = await api({
      url: `movies/${this.idMovie}/reviews`,
      method: 'get'
    })
    this.ratingData = data.data
  },
}
</script>

<template>
  <div
    class="col-10 border rounded m-2"
    v-if="this.reviewData.totalItems >= 1"
    id="collectionsMovie"
  >
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-5 fw-bold text-center">Reviews</p>
        </div>
      </div>
      <div class="row my-2">
        <div
          class="col-12 d-flex flex-column border rounded my-2"
          v-for="review in this.reviewData.member"
        >
          <router-link :to="{ path: '/user/' + review.user.id }">
            <p class="fs-6 my-2 text-decoration-underline fw-bold color_yellow">
              {{ review.user.username }}
            </p>
          </router-link>
          <p class="font-monospace">{{ review.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
