<script>
import JudgementAPI from '@/components/JudgementAPI.vue'
import { toRaw } from 'vue'

export default {
  name: 'GenreLogicPage',
  data() {
    return {
      displayItems: 30,
      page: 1,
      movies: [],
      urlNotPoster: 'https://placehold.co/150x237',
    }
  },
  props: {
    idGenre: {
      type: String,
      required: true,
    },
  },
  methods: {
    async feedBackPoster(url) {
      try {
        const response = await fetch(url, { method: 'HEAD' })
        return response.ok ? url : this.urlNotPoster
      } catch (error) {
        return this.urlNotPoster
      }
    },
    async getMovies() {
      const textWait = document.getElementById('textWait')
      let data = toRaw(
        await JudgementAPI.mounted(
          'GET',
          `genres/${this.idGenre}/movies?page=${this.page}&itemsPerPage=${this.displayItems}`,
          '',
          undefined,
          '',
        ),
      )
      textWait.style.display = 'none'
      for (const item of Object.values(data.member)) {
        this.movies.push({
          id: item.id,
          poster: await this.feedBackPoster(item.poster),
          title: item.title,
          year: item.year,
          rating: item.imdb.rating,
          genres: item.genres,
        })
      }
    },
  },
  async mounted() {
    setTimeout(await this.getMovies(), 3000)
  },
}
</script>

<template>
  <div class="row" id="moviesLists">
    <div class="col-12 mt-5 align-items-center flex-column" style="display: flex" id="textWait">
      <p class="fs-2 fw-bold">Chargement...</p>
    </div>
    <div class="col-12 my-2 border rounded" v-for="movie in movies">
      <div class="container-fuid">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center flex-column">
            <div class="poster">
              <div id="posterMovie">
                <router-link :to="{ path: '/movie/' + movie.id }">
                  <img
                    :src="movie.poster ?? this.urlNotPoster"
                    class="img-fluid"
                    :alt="movie.title"
                  />
                </router-link>
              </div>
              <div
                id="ratingMovie"
                class="mt-2 d-flex align-items-center flex-row justify-content-center"
              >
                <svg
                  width="24"
                  height="24"
                  xmlns="http://www.w3.org/2000/svg"
                  class="iconRating"
                  viewBox="0 0 24 24"
                  fill="#f5c518"
                  role="presentation"
                >
                  <path
                    d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
                  ></path>
                </svg>
                <p class="fs-6 m-0 ms-1 text-white">
                  {{ movie.rating }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-10 d-flex flex-column">
            <div class="mt-2">
              <router-link
                :to="{ path: '/movie/' + movie.id }"
                class="text-decoration-none fs-5 p-0 fw-bold text-black"
              >
                {{ movie.title }}
              </router-link>
            </div>
            <div class="my-2">
              <p class="fs-6 p-0">
                Sortie en : <span class="fst-italic">{{ movie.year }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
