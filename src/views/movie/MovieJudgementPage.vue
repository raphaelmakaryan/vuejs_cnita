<script>
import JudgementAPI from '@/components/JudgementAPI.vue'
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
  <MovieConnectedJudgement
    :idMovie="valueIdMovie"
    v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"
  />

  <MovieInfos :idMovie="valueIdMovie" />

  <section id="otherDetail" class="my-5">
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-lg-1"></div>
        <MovieCollections :idMovie="valueIdMovie" />
        <MovieRating :idMovie="valueIdMovie" />
        <div class="col-lg-1"></div>
      </div>
      <div class="row my-2">
        <div class="col-lg-1"></div>
        <MovieReview :idMovie="valueIdMovie" />
        <div class="col-lg-1"></div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
