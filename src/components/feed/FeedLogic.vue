<template>
  <div
    class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 my-2 d-flex align-items-center flex-column"
    v-for="feed in feedData.items"
  >
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">
          <router-link :to="{ path: '/user/' + feed.data.user.id }">
            {{ feed.data.user.username }}
          </router-link>
          a crée {{ this.typeVerification(feed.type.toLowerCase()) }} !
        </h5>
        <p class="card-text">Date de creation : {{ format(feed.createdAt) }}</p>
        <router-link
          class="btn btn-primary w-100"
          :to="this.linkSpecifically(feed.type.toLowerCase(), feed)"
          >Voir</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
  name: 'FeedLogic',
  props: {
    feedData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    format,
    typeVerification(value) {
      switch (value) {
        case 'rating':
          return 'un nouveau vote'
        default:
          return 'une nouvelle ' + value
      }
    },
    linkSpecifically(value, data) {
      switch (value) {
        case 'collection':
          return { name: 'ListJudgementPage', params: { id: data.data.id } }
        default:
          return { name: 'MovieJudgementPage', params: { id: data.data.movie.id } }
      }
    },
  },
}
</script>

<style scoped></style>
