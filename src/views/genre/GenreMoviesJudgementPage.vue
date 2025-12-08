<script>
import HeaderJudgement from '@/components/header/HeaderJudgement.vue'
import api from "@/assets/api.js"
import {toRaw} from 'vue'
import Pagination from '@/components/Pagination.vue'
import GenreLogicPage from '@/components/genre/page/GenreLogicPage.vue'

export default {
  name: 'GenreMoviesJudgement',
  components: {GenreLogicPage, Pagination},
  data() {
    return {
      valueIdGenre: this.$route.params.id,
      displayItems: 30,
      page: 1,
      totalPages: 1,
    }
  },
  methods: {
    updateTotalPages(totalItems) {
      this.totalPages = Math.ceil(totalItems / this.displayItems)
    },
    async changePage(value) {
      this.page = value
    },
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 titleSeparation m-0">FILMS TROUVER</p>
          <hr/>
        </div>
      </div>
      <GenreLogicPage :idGenre="this.valueIdGenre" :page="this.page"
                      :displayItems="this.displayItems" @movies-loaded="updateTotalPages"/>
    </div>
  </section>

  <Pagination
    :currentPage="page"
    :totalPages="totalPages"
    :function="changePage"
  />
</template>

<style scoped>

</style>
