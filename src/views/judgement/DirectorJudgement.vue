<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";

export default {
  name: "DirectorJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdDirector: this.$route.params.id,
      director: [],
      movies: []
    };
  },
  methods: {
    async getDirector() {
      this.director = toRaw(await JudgementAPI.mounted("GET", `people/${this.valueIdDirector}`, "", ""))
    },
    async getMoviesFromDirector() {
      this.movies = toRaw(await JudgementAPI.mounted("GET", `directors/${this.valueIdDirector}/movies`, "", ""))
    }
  },
  async mounted() {
    await this.getDirector();
    await this.getMoviesFromDirector();
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section class="my-5" v-if="Object.keys(this.director).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            INFORMATIONS DU DIRECTEUR
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <p class="fs-6"><span class="text-decoration-underline">
            Nom du directeur :
          </span>
            {{ director.fullName }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5" v-if="Object.keys(this.movies).length > 0">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            FILMS REALISÉ
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
