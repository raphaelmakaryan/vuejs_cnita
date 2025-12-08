<script>
import VueCookies from 'vue-cookies'
import MovieConnectedJudgement from '@/components/movie/MovieConnected.vue'
import MovieInfos from '@/components/movie/MovieInfos.vue'
import MovieCollections from '@/components/movie/MovieCollections.vue'
import MovieRating from '@/components/movie/MovieRating.vue'
import MovieReview from '@/components/movie/MovieReview.vue'

export default {
  name: 'MovieJudgement',
  components: {
    MovieReview,
    MovieRating,
    MovieCollections,
    MovieInfos,
    MovieConnectedJudgement,
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  data() {
    return {
      valueIdMovie: this.$route.params.id,
    }
  },
}
</script>

<template>
  <MovieInfos :idMovie="valueIdMovie" />

  <MovieConnectedJudgement
    :idMovie="valueIdMovie"
    v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"
  />

  <section class="my-5" id="collectionsMovie">
    <div class="container">
      <div class="row">
        <MovieCollections :idMovie="valueIdMovie" />
      </div>
    </div>
  </section>

  <section class="my-5" id="rankingMovie">
    <div class="container">
      <div class="row">
        <MovieRating :idMovie="valueIdMovie" />
      </div>
    </div>
  </section>

  <section class="my-5" id="reviewMovie">
    <div class="container">
      <div class="row">
        <MovieReview :idMovie="valueIdMovie" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
