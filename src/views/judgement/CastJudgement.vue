<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";

export default {
  name: "CastJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdCast: this.$route.params.id,
      cast: [],
      movies: []
    };
  },
  methods: {
    async getCast() {
      this.cast = toRaw(await JudgementAPI.mounted("GET", `people/${this.valueIdCast}`, ""))
    },
    async getMoviesFromCast() {
      this.movies = toRaw(await JudgementAPI.mounted("GET", `casts/${this.valueIdCast}/movies`, ""))
    }
  },
  async mounted() {
    await this.getCast();
    await this.getMoviesFromCast();
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section class="my-5" v-if="Object.keys(this.cast).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            INFORMATIONS DE L'ACTEUR
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <p class="fs-6"><span class="text-decoration-underline">
            Nom de l'acteur :
          </span>
            {{ cast.fullName }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5" v-if="Object.keys(this.movies).length > 0">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            FILMS PRESENT
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2 d-flex flex-column flex-md-row align-items-center">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="movie in this.movies.member">
          <router-link :to="{path: '/judgement/movie/' + movie.id }" class="text-decoration-none">
            <div class="card" style="width: 18rem;">
              <img :src="movie.poster" class="card-img-top" :alt="movie.title">
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

<style scoped>

</style>
