<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import ApexCharts from 'apexcharts'

export default {
  name: 'MovieInfos',
  data() {
    return {
      movie: [],
      chartData: [],
    }
  },
  props: {
    idMovie: {
      type: String,
      required: true,
    },
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  methods: {
    async createChart() {
      let options = {
        chart: {
          type: 'bar',
          height: 300,
        },
        series: [
          {
            name: 'Chart',
            data: [
              parseFloat(this.chartData[0]) * 10,
              parseInt(this.chartData[1]),
              (parseFloat(this.chartData[0]) * 10 + parseInt(this.chartData[1])) / 2,
            ],
          },
        ],
        fill: {
          colors: ['#d4af37'],
        },
        dataLabels: {
          style: {
            colors: ['#0000000'],
          },
        },
        xaxis: {
          categories: ['IMDB', 'Tomatoes', 'Moyenne'],
        },
      }
      let chart = new ApexCharts(document.getElementById('forChartMovie'), options)
      chart.render()
    },
    forChart() {
      if (this.movie.imdb.rating == null) {
        this.chartData.push(0)
      } else {
        this.chartData.push(this.movie.imdb.rating)
      }
      if (this.movie.tomatoes.meter == null) {
        this.chartData.push(0)
      } else {
        this.chartData.push(this.movie.tomatoes.meter)
      }
    },
  },
  async mounted() {
    let data = await api.get(`movies/${this.idMovie}`)
    this.movie = data.data
    this.forChart()
    await this.createChart()
  },
}
</script>

<template>
  <section id="detailMovie" class="my-5" v-if="Object.keys(this.movie).length >= 1">
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-6 d-flex flex-column align-items-center my-2 top-50"
        >
          <div class="moviePoster">
            <img
              :src="movie.poster ? movie.poster : 'https://placehold.co/600x400'"
              class="img-fluid h-75"
              :alt="movie.title"
            />
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 my-2">
          <div class="my-2">
            <p class="fs-1 fw-bold color_yellow">{{ movie.title }}</p>
            <p class="fs-6 text-secondary">{{ movie.fullPlot }}</p>
          </div>
          <div class="cardDetail d-flex flex-column p-3">
            <div id="outMovie" class="d-flex flex-column">
              <div>
                <p class="fs-6 movieLabel">Sortie en :</p>
              </div>
              <div>
                <p class="fs-6 valueMovie">{{ movie.year }}</p>
              </div>
            </div>
            <div id="directorsMovie" class="d-flex flex-column my-2">
              <div>
                <p class="fs-6 movieLabel">Réalisateur(s) :</p>
              </div>
              <div>
                <router-link
                  :to="{ path: '/director/' + director.id }"
                  v-for="director in movie.directors"
                  class="linkMovie text-white"
                >
                  {{ director.fullName }}
                </router-link>
              </div>
            </div>
            <div id="castMovie" class="d-flex flex-column my-2">
              <div>
                <p class="fs-6 movieLabel">Acteur(s) :</p>
              </div>
              <div>
                <router-link
                  :to="{ path: '/cast/' + actor.id }"
                  v-for="actor in movie.castMembers"
                  class="linkMovie text-white m-1 p-1"
                >
                  {{ actor.fullName }}
                </router-link>
              </div>
            </div>
            <div id="createMovie" class="d-flex flex-column my-2">
              <div>
                <p class="fs-6 movieLabel">Crée au(x) :</p>
              </div>
              <div class="d-flex flex-row">
                <p class="text-white m-1 p-1" v-for="country in movie.countries">{{ country }}</p>
              </div>
            </div>
            <div id="imdbMovie" class="d-flex flex-column my-2">
              <div>
                <p class="fs-6 movieLabel">Vote IMDB :</p>
              </div>
              <div class="d-flex flex-row">
                <p class="text-white">
                  <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    />
                  </svg>
                  {{ movie.imdb?.rating ?? 0 }}
                  <span class="text-secondary"> pour {{ movie.imdb?.votes ?? 0 }} votes</span>
                </p>
              </div>
            </div>
            <div id="tomatoesMovie" class="d-flex flex-column my-2">
              <div>
                <p class="fs-6 movieLabel">Vote Tomatoes :</p>
              </div>
              <div class="d-flex flex-row">
                <p class="text-white">
                  <svg
                    data-v-afc74070=""
                    class="tomato-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle data-v-afc74070="" cx="12" cy="12" r="10"></circle>
                  </svg>
                  {{ movie.tomatoes?.rating ?? 0 }}
                  <span class="text-secondary"> pour {{ movie.tomatoes?.votes ?? 0 }} votes</span>
                </p>
              </div>
            </div>
            <hr />
            <div id="genreMovies" class="d-flex flex-column my-2">
              <div>
                <p class="fs-6 movieLabel">Genres :</p>
              </div>
              <div>
                <router-link
                  :to="{ path: '/genres/' + genre.id + '/movies' }"
                  v-for="genre in movie.genres"
                  class="genreMovie m-1 p-2"
                >
                  {{ genre.label }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="chartMovie" class="my-5">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 text-uppercase titleSeparation">Graphique</p>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-2 cardConnectedChoose">
          <div id="forChartMovie"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.valueMovie {
  font-size: 1rem;
}

.linkMovie {
  font-weight: 500;
  padding: 6px 12px;
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  text-decoration: none;
}

.linkMovie:hover {
  background: var(--color-bg-elevated);
}

.star-icon,
.tomato-icon {
  width: 24px;
  height: 24px;
  color: var(--color-yellow-primary);
}

.genreMovie {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(240, 194, 69, 0.05));
  border: 1px solid var(--color-yellow-primary);
  border-radius: 20px;
  color: var(--color-yellow-primary);
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
}

.genreMovie:hover {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(240, 194, 69, 0.1));
  transform: translateY(-2px);
}

.tomato-icon {
  color: #ff6b6b;
}
</style>
