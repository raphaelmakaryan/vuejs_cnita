<script>
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'
import GenreLogic from './GenreLogic.vue'

export default {
  name: 'GenreJudgement',
  data() {
    return {
      genres: [],
    }
  },
  async mounted() {
    this.genres = toRaw(await JudgementAPI.mounted('GET', 'genres', '', '', ''))
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
          <p class="fs-2">GENRES</p>
          <hr />
        </div>
      </div>
      <div class="row">
        <GenreLogic :GenreData="this.genres" />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
