<script>
import { format } from 'timeago.js'
import '@splidejs/vue-splide/css'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
export default {
  name: 'GenreJudgement',
  props: {
    GenreData: {
      type: Object,
      required: true,
    },
  },
  components: {
    Splide,
    SplideSlide,
  },
  methods: {
    format,
  },
}
</script>

<template>
  <div class="col-12">
    <Splide :options="{ rewind: true, perPage: 3 }" aria-label="Tout les genres de films">
      <SplideSlide v-for="genre in this.GenreData.member">
        <router-link :to="{ path: '/genres/' + genre.id + '/movies' }">
          <div class="boxHome p-5 m-1">
            {{ genre.label }}
          </div>
        </router-link>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style scoped>
.boxHome {
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  text-decoration: none;
  color: white;
}

.splide__slide {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
