<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import {toRaw} from "vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "GenreMoviesJudgement",
  components: {HeaderJudgement, Pagination},
  data() {
    return {
      valueIdGenre: this.$route.params.id,
      allMovies: [],
      displayItems: 30,
      page: 1,
      movies: [],
    };
  },
  methods: {
    async setupGenre() {
      this.resetData()
      await this.getMovies();
      await this.getSpecifically();
    },
    resetData() {
      this.allMovies = []
      this.movies = []
    },
    async getMovies() {
      this.allMovies = toRaw(await JudgementAPI.mounted("GET", `genres/${this.valueIdGenre}/movies?page=${this.page}&itemsPerPage=${this.displayItems}`, ""))
    },
    async getSpecifically() {
      Object.values(this.allMovies.member).forEach((item) => {
        this.movies.push({
          id: item.id,
          title: item.title,
          year: item.year,
          rating: item.imdb.rating,
          poster: item.poster,
          genres: item.genres,
        });
      })
    },
    async changePage(value) {
      this.page = value;
      document.getElementById("moviesLists").innerHTML = "";
      await this.setupGenre();
    }
  },
  async mounted() {
    await this.setupGenre();
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section class="mt-5" v-if="movies.length > 0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2">FILMS TROUVER</p>
          <hr>
        </div>
      </div>
      <div class="row" id="moviesLists">
        <div class="col-12 my-2 border rounded" v-for="movie in movies">
          <div class="container-fuid">
            <div class="row">
              <div class="col-2 d-flex justify-content-center align-items-center flex-column">
                <div class="poster">
                  <div id="posterMovie">
                    <router-link :to="{path: '/judgement/movie/' + movie.id }">
                      <img :src="movie.poster ? movie.poster : 'https://placehold.co/600x400'"
                           class="img-fluid" :alt="movie.title">
                    </router-link>
                  </div>
                  <div id="ratingMovie"
                       class="mt-2 d-flex align-items-center flex-row justify-content-center">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                         class="iconRating" viewBox="0 0 24 24"
                         fill="#f5c518" role="presentation">
                      <path
                        d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
                    </svg>
                    <p class="fs-6 m-0 ms-1 text-white">
                      {{ movie.rating }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="col-10 d-flex flex-column">
                <div class="mt-2">
                  <router-link :to="{path: '/judgement/movie/' + movie.id }"
                               class="text-decoration-none fs-5 p-0 fw-bold text-black">
                    {{ movie.title }}
                  </router-link>
                </div>
                <div class="my-2">
                  <p class="fs-6 p-0">Sortie en : <span class="fst-italic">{{ movie.year }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <Pagination
    :currentPage=this.page
    :totalPages=Math.round(this.allMovies.totalItems/this.displayItems)
    :function="changePage"
  />


</template>

<style scoped>
.poster {
  background: rgb(22, 27, 38);
  padding: 11px;
  position: relative;
  width: 174px;
  border: 1px solid rgb(51, 55, 65);
  border-radius: 4px;
}
</style>
