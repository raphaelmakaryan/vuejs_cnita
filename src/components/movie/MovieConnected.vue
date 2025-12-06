<script>
import VueCookies from 'vue-cookies'
import MovieConnectedCollectionJudgement from '@/components/movie/MovieConnectedCollection.vue'
import MovieConnectedRatingJudgement from '@/components/movie/MovieConnectedRating.vue'
import MovieConnectedReviewJudgement from '@/components/movie/MovieConnectedReview.vue'

export default {
  name: 'MovieConnectedJudgement',
  components: {
    MovieConnectedReviewJudgement,
    MovieConnectedRatingJudgement,
    MovieConnectedCollectionJudgement,
  },
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
}
</script>
<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <MovieConnectedCollectionJudgement :idMovie="idMovie" />
        <MovieConnectedRatingJudgement :idMovie="idMovie" />
        <MovieConnectedReviewJudgement :idMovie="idMovie" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
