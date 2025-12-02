<script>
import '@splidejs/vue-splide/css';
import {Splide, SplideSlide} from '@splidejs/vue-splide';
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";

export default {
  name: "GenreJudgement",
  data() {
    return {
      allDataGenres: [],
      genres: [],
    }
  },
  methods: {
    async getData() {
      this.allDataGenres = toRaw(await JudgementAPI.mounted("genres"))
    },
    async getSpecifically() {
      Object.values(this.allDataGenres.member).forEach((item) => {
        this.genres.push({id: item.id, label: item.label})
      })
    }
  },
  async mounted() {
    await this.getData();
    await this.getSpecifically();
  },
  components: {
    Splide,
    SplideSlide,
  },
}
</script>

<template>
  <section class="my-5" v-if="this.genres.length > 0">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2">GENRES</p>
          <hr>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <Splide :options="{ rewind: true, perPage : 3 }" aria-label="Tout les genres de films">
            <SplideSlide v-for="genre in this.genres">
              <router-link :to="{path: '/judgement/genres/' + genre.id + '/movies'}">
                <div class="boxHome p-5 m-1">
                  {{ genre.label }}
                </div>
              </router-link>
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </div>
  </section>
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
