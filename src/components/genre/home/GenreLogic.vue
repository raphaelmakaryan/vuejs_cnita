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
      <SplideSlide v-for="genre in this.GenreData.member" class="mb-5">
        <router-link :to="{ path: '/genres/' + genre.id + '/movies' }" class="text-decoration-none">
          <div class="genre-overlay"></div>
          <div class="boxHome p-5 m-1 d-flex align-items-center flex-column justify-content-center">
            {{ genre.label }}
          </div>
        </router-link>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style scoped>
.boxHome {
  min-width: 280px;
  height: 180px;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-elevated));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
}

.boxHome::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.boxHome:hover::before {
  opacity: 1;
}

.boxHome:hover {
  transform: translateY(-6px);
}

.splide__slide {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
