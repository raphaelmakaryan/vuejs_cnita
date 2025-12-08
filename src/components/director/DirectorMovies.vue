<script>
import { toRaw } from 'vue'
import api from "@/assets/api.js"

export default {
  name: 'DirectorMoviesJudgement',
  data() {
    return {
      movies: [],
    }
  },
  props: {
    idDirector: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    this.movies = toRaw(
      await api('GET', `directors/${this.idDirector}/movies`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.movies).length > 0">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FILMS REALISÉ</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2 d-flex flex-column flex-md-row align-items-center">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="movie in this.movies.member">
          <router-link :to="{ path: '/movie/' + movie.id }" class="text-decoration-none">
            <div class="card" style="width: 18rem">
              <img :src="movie.poster" class="card-img-top" :alt="movie.title" />
              <div class="card-body">
                <h5 class="card-title">{{ movie.title }}</h5>
                <p class="card-text text-wrap">{{ movie.plot }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
