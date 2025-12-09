<script>
import { format } from 'timeago.js'

export default {
  name: 'ListMoviesJudgement',
  props: {
    listData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    format,
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.listData.entries).length > 0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FILMS AJOUTER</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2 d-flex flex-column flex-md-row align-items-center">
        <div class="col-12 col-sm-12 col-md-6 col-lg-4 d-flex align-items-center flex-column" v-for="movie in this.listData.entries">
          <router-link :to="{ path: '/movie/' + movie.movie.id }" class="text-decoration-none">
            <div class="card my-2" style="width: 18rem">
              <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.title" />
              <div class="card-body">
                <h5 class="card-title text-white">{{ movie.movie.title }}</h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  --bs-card-border-color: var(--color-bg-tertiary);
}
.card-body {
  background: var(--color-bg-tertiary) !important;
  border: 1px solid var(--bs-card-border-color) !important;
  --bs-card-border-width: unset !important;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-yellow-hover);
}
</style>
