<script>
import HeaderJudgement from '@/components/header/HeaderJudgement.vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import { toRaw } from 'vue'
import Pagination from '@/components/Pagination.vue'
import GenreLogicPage from '@/components/genre/page/GenreLogicPage.vue'

export default {
  name: 'GenreMoviesJudgement',
  components: { GenreLogicPage, Pagination },
  data() {
    return {
      valueIdGenre: this.$route.params.id,
      allMovies: [],
      displayItems: 30,
      page: 1,
      movies: [],
      urlNotPoster: 'https://placehold.co/150x237',
    }
  },
  methods: {
    async setupGenre() {
      this.resetData()
    },
    resetData() {
      this.allMovies = []
      this.movies = []
    },
    async changePage(value) {
      this.page = value
      document.getElementById('moviesLists').innerHTML = ''
      //await this.setupGenre()
    },
  },
  async mounted() {
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 titleSeparation m-0">FILMS TROUVER</p>
          <hr />
        </div>
      </div>
      <GenreLogicPage :idGenre="this.valueIdGenre" />
    </div>
  </section>

  <!--
  <Pagination
    :currentPage=this.page
    :totalPages=Math.round(this.allMovies.totalItems/this.displayItems)
    :function="changePage"
  />
-->
</template>

<style scoped>

</style>
