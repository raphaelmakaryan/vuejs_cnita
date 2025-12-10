<script>
import {format} from 'timeago.js'
import api from "@/assets/api.js"

export default {
  name: 'UserReview',
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      review: [],
    }
  },
  async mounted() {
    let data = await api.get(`users/${this.idUser}/reviews`)
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
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3 titleSeparation m-0">REVIEWS</p>
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
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
