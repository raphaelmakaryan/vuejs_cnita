<script>
import VueCookies from 'vue-cookies'
import { toRaw } from 'vue'
import api from "@/assets/api.js"

export default {
  name: 'MovieInfos',
  data() {
    return {
      movie: [],
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
  async mounted() {
    this.movie = toRaw(
      await api('GET', `movies/${this.idMovie}`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section id="detailMovie" class="my-5" v-if="Object.keys(this.movie).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-3">
          <img
            :src="movie.poster ? movie.poster : 'https://placehold.co/600x400'"
            class="img-fluid w-100"
            :alt="movie.title"
          />
        </div>
        <div class="col-9">
          <p class="fs-5 fw-bold">{{ movie.title }}</p>
          <p class="fs-6">{{ movie.fullPlot }}</p>
          <p class="fs-6">
            <span class="text-decoration-underline">Sortie en :</span> {{ movie.year }}
          </p>
          <p class="fs-6">
            <span class="text-decoration-underline">Directeurs :</span>
            <span class="mx-1" v-for="director in movie.directors">
              <router-link :to="{ path: '/director/' + director.id }">
                {{ director.fullName }}
              </router-link>
            </span>
          </p>
          <p class="fs-6">
            <span class="text-decoration-underline">Acteurs :</span>
            <span class="mx-1" v-for="actor in movie.castMembers">
              <router-link :to="{ path: '/cast/' + actor.id }">{{ actor.fullName }}</router-link>
            </span>
          </p>
          <p class="fs-6">
            <span class="text-decoration-underline">Crée au(x) :</span>
            <span class="mx-1" v-for="country in movie.countries">
              {{ country }}
            </span>
          </p>
          <p class="fs-6">
            <span class="text-decoration-underline">Vote IMDB :</span>
            {{ movie.imdb?.rating ?? 0 }} pour {{ movie.imdb?.votes ?? 0 }} votes
          </p>

          <p class="fs-6">
            <span class="text-decoration-underline">Vote Tomatoes :</span>
            {{ movie.tomatoes?.rating ?? 0 }} pour
            {{ movie.tomatoes?.votes ?? 0 }} votes
          </p>

          <p class="fs-6">
            <span class="text-decoration-underline">Genres :</span>
            <span class="mx-1" v-for="genre in movie.genres">
              <router-link :to="{ path: '/genres/' + genre.id + '/movies' }">
                {{ genre.label }}
              </router-link>
            </span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
