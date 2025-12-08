<script>
import api from "@/assets/api.js"
import {toRaw} from 'vue'
import VueCookies from "vue-cookies";

export default {
  name: 'GenreLogicPage',
  data() {
    return {
      rawMovies: [],
      urlNotPoster: 'https://placehold.co/150x237',
    }
  },
  props: {
    idGenre: {
      type: String,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    displayItems: {
      type: Number,
      required: true,
    }
  },
  watch: {
    page() {
      this.rawMovies = []
      this.getMovies()
    }
  },
  methods: {
    async feedBackPoster(url) {
      try {
        await fetch(url, {method: 'HEAD'})
        return url
      } catch (e) {
        return this.urlNotPoster
      }
    },
    async getMovies() {
      let data = await api({
        url: `genres/${this.idGenre}/movies`,
        method: 'get',
        params: {
          page: this.page,
          itemsPerPage: this.displayItems
        }
      })
      this.rawMovies = []
      document.getElementById('textWait').style.display = 'none'
      for (const item of data.data.member) {
        const poster = await this.feedBackPoster(item.poster)
        this.rawMovies.push({
          id: item.id,
          poster: poster,
          title: item.title,
          year: item.year,
          rating: item.imdb?.rating ?? 0,
          genres: item.genres
        })
      }
      this.$emit("movies-loaded", data.data.totalItems)
    }
  },
  async mounted() {
    setTimeout(await this.getMovies(), 3000)
  },
}
</script>

<template>
  <div class="row" id="moviesLists">
    <div class="col-12 mt-5 align-items-center flex-column" style="display: flex" id="textWait">
      <p class="fs-2 fw-bold text-white">Chargement...</p>
    </div>
    <div class="col-12 my-2 movie-card rounded" v-for="movie in rawMovies" v-if="this.rawMovies">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center flex-column">
            <div
              class="poster-placeholder d-flex align-items-center justify-content-center text-secondary position-relative">
              <router-link :to="{ path: '/movie/' + movie.id }"
                           class="d-flex flex-column align-items-start justify-content-end m-2">
                <img :src="movie.poster ?? this.urlNotPoster" class="img-fluid" :alt="movie.title"/>
                <div class="movie-rating d-flex align-items-center m-1">
                  <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                    </path>
                  </svg>
                  <span class="rating-value fw-bold text-white"> {{ movie.rating }}</span></div>
              </router-link>
            </div>
          </div>
          <div class="col-10 d-flex flex-column align-items-start justify-content-center">
            <div class="mt-2">
              <router-link :to="{ path: '/movie/' + movie.id }"
                           class="text-decoration-none fs-3 p-0 fw-bold text-white text-white">
                {{ movie.title }}
              </router-link>
            </div>
            <div class="my-2">
              <p class="fs-6 p-0 year text-secondary">
                Sortie en : <span>{{ movie.year }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.movie-card:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-yellow-primary);
  transform: translateX(8px);
  box-shadow: var(--shadow-lg);
}

.year {
  font-size: 1rem;
}

.year span {
  color: var(--color-yellow-primary);
  font-weight: 600;
  font-style: italic;
}

.movie-rating {
  position: absolute;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-yellow-primary);
  padding: 6px 12px;
  border-radius: 20px;
}

.star-icon {
  width: 18px;
  height: 18px;
  color: var(--color-yellow-primary);
}

.rating-value {
  font-size: 0.95rem;
}
</style>
