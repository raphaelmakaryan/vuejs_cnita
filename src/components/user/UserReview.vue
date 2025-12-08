<script>
import {toRaw} from 'vue'
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
    let data = await api({
      url: `users/${this.idUser}/reviews`,
      method: 'get',
    })
    this.review = data.data
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.review).length >= 1 && this.review.member.length >= 1"
  >
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">REVIEWS</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-column border rounded p-2 my-2"
          v-for="review in this.review.member"
        >
          <router-link
            :to="{ path: '/movie/' + review.movie.id }"
            class="text-decoration-none"
          >
            <p class="fs-6 text-decoration-underline fw-bold color_yellow">
              {{ review.movie.title }}
            </p>
          </router-link>
          <p class="font-monospace">{{ review.content }}</p>
          <p>
            <span class="text-decoration-underline me-1"> Crée le : </span>
            {{ format(review.createdAt) }}
          </p>
          <p>
            <span class="text-decoration-underline me-1"> Derniere mise a jour le : </span>
            {{ format(review.updateddAt) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
