<script>
import GenreLogic from './GenreLogic.vue'
import api from "@/assets/api.js"

export default {
  name: 'GenreJudgement',
  data() {
    return {
      genres: [],
    }
  },
  async mounted() {
    let data = await api({
      url: '/genres',
      method: 'get'
    })
    this.genres = data.data
  },
  components: {
    GenreLogic,
  },
}
</script>

<template>
  <section class="my-5" v-if="this.genres.totalItems > 0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 titleSeparation">GENRES</p>
          <hr/>
        </div>
      </div>
      <div class="row">
        <GenreLogic :GenreData="this.genres"/>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
