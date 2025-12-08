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
    <div class="col-12 my-2 movie-card" v-for="movie in movies">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2 d-flex justify-content-center align-items-center flex-column">
            <div class="poster-placeholder position-relative">
              <router-link :to="{ path: '/movie/' + movie.id }"
                class="d-flex flex-column align-items-start justify-content-end m-2">
                <img :src="movie.poster ?? this.urlNotPoster" class="img-fluid" :alt="movie.title" />
                <div class="movie-rating m-1"><svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z">
                    </path>
                  </svg><span class="rating-value"> {{ movie.rating }}</span></div>
              </router-link>
            </div>
          </div>
          <div class="col-10 d-flex flex-column align-items-start justify-content-center">
            <div class="mt-2">
              <router-link :to="{ path: '/movie/' + movie.id }" class="text-decoration-none fs-3 p-0 title text-white">
                {{ movie.title }}
              </router-link>
            </div>
            <div class="my-2">
              <p class="fs-6 p-0 year">
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
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
  /*cursor: pointer;

   */
}

.movie-card:hover {
  background: var(--color-bg-tertiary);
  border-color: var(--color-accent-primary);
  transform: translateX(8px);
  box-shadow: var(--shadow-lg);
}

.title {
  font-weight: 600;
  color: var(--color-text-primary);
}

.year {
  color: var(--color-text-secondary);
  font-size: 1rem;
}

.year span {
  color: var(--color-accent-primary);
  font-weight: 600;
  font-style: italic;
}

.poster-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
}

.movie-rating {
  position: absolute;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--color-accent-primary);
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}

.star-icon {
  width: 18px;
  height: 18px;
  color: var(--color-accent-primary);
}

.rating-value {
  font-weight: 600;
  color: var(--color-text-primary);
  font-size: 0.95rem;
}
</style>
