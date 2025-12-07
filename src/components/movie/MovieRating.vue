<script>
import VueCookies from 'vue-cookies'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
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
    this.ratingData = toRaw(
      await JudgementAPI.mounted(
        'GET',
        `movies/${this.idMovie}/ratings?page=1&itemsPerPage=30`,
        '',
        undefined,
        '',
      ),
    )
  },
}
</script>

<template>
  <div
    class="col-5 border rounded m-2"
    v-if="Object.keys(this.ratingData).length >= 1"
    id="ratingMovie"
  >
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-5 fw-bold text-center">Votes</p>
        </div>
      </div>
      <div class="row my-2">
        <div
          class="col-12 d-flex flex-column border rounded my-2"
          v-for="rating in this.ratingData.member"
        >
          <p class="fs-6 m-0 text-decoration-underline fw-bold">{{ rating.note }} / 10</p>
          <p class="fs-6 m-0">
            <span class="text-decoration-underline me-1">Voté par : </span>
            <router-link :to="{ path: '/user/' + rating.user.id }">
              {{ rating.user.username }}
            </router-link>
          </p>
          <p class="fs-6 m-0">
            <span class="text-decoration-underline">Crée le : </span>
            {{ format(rating.user.createdAt) }}
          </p>
          <p class="fs-6 m-0">
            <span class="text-decoration-underline">Derniere mise a jour le : </span>
            {{ format(rating.user.updatedAt) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
