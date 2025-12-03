<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import {format} from 'timeago.js';
import {toRaw} from "vue";

export default {
  name: "MovieJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      movie: [],
      lists: [],
      ratings: []
    };
  },
  methods: {
    format,
    async getDetailMovie() {
      this.movie = toRaw(await JudgementAPI.mounted(`movies/${this.valueIdMovie}/`))
    },
    async getListsMovie() {
      let data = toRaw(await JudgementAPI.mounted(`movies/${this.valueIdMovie}/custom_list_entries?page=1&itemsPerPage=30`))
      this.lists = data.member
    },
    async getRatingMovie() {
      let data = toRaw(await JudgementAPI.mounted(`movies/${this.valueIdMovie}/ratings?page=1&itemsPerPage=30`))
      this.ratings = data.member
    },
  },
  async mounted() {
    await this.getDetailMovie();
    await this.getListsMovie();
    await this.getRatingMovie();
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section id="detailMovie" class="my-5" v-if="Object.keys(this.movie).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-3">
          <img :src="movie.poster ? movie.poster : 'https://placehold.co/600x400'"
               class="img-fluid w-100" :alt="movie.title">
        </div>
        <div class="col-9">
          <p class="fs-5 fw-bold">{{ movie.title }}</p>
          <p class="fs-6">{{ movie.fullPlot }}</p>
          <p class="fs-6"><span class="text-decoration-underline">Sortie en :</span> {{
              movie.year
            }}
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Directeurs :</span>
            <span class="mx-1" v-for="director in movie.directors">
              <router-link :to="{path: '/judgement/director/' + director.id }">
              {{ director.fullName }}
              </router-link>
          </span>
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Acteurs :</span>
            <span class="mx-1" v-for="actor in movie.castMembers">
                 <router-link :to="{path: '/judgement/cast/' + actor.id }">{{
                     actor.fullName
                   }}</router-link>
          </span>
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Crée au(x) :</span>
            <span class="mx-1" v-for="country in movie.countries">
            {{ country }}
          </span>
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Vote IMDB :</span>
            {{ movie.imdb ? movie.imdb.rating : 0 }} pour
            {{ movie.imdb ? movie.imdb.votes : 0 }} votes</p>
          <p class="fs-6"><span class="text-decoration-underline">Vote Tomatoes :</span>
            {{ movie.tomatoes ? movie.tomatoes.rating : 0 }} pour
            {{ movie.tomatoes ? movie.tomatoes.votes : 0 }} votes</p>
          <p class="fs-6"><span class="text-decoration-underline">Genres :</span> <span class="mx-1"
                                                                                        v-for="genre in movie.genres">
             <router-link :to="{path: '/judgement/genres/' + genre.id + '/movies'}">
            {{ genre.label }}
             </router-link>
          </span></p>
        </div>
      </div>
    </div>
  </section>

  <section id="otherDetail" class="my-5">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-1"></div>
        <div class="col-5 border rounded m-2" v-if="Object.keys(this.lists).length >= 1"
             id="collectionsMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Collections</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2"
                   v-for="list in this.lists">
                <router-link :to="{path: '/judgement/list/' + list.id}">
                  <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{
                      list.customList.title
                    }}</p>
                </router-link>

                <p class="fs-6 m-0 text-black "><span
                  class="text-decoration-underline me-1">Crée par : </span>
                  <router-link :to="{path: '/judgement/user/' + list.customList.user.id }"
                  >{{
                      list.customList.user.username
                    }}
                  </router-link>
                </p>

                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Crée le : </span>{{
                    format(list.customList.createdAt)
                  }}
                </p>
                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Derniere mise a jour le : </span>{{
                    format(list.customList.updatedAt)
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 border rounded m-2" v-if="Object.keys(this.ratings).length >= 1"
             id="ratingMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Votes</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2"
                   v-for="rating in this.ratings">
                <p class="fs-6 m-0 text-decoration-underline fw-bold">{{ rating.note }} /
                  10</p>
                <p class="fs-6 m-0"><span class="text-decoration-underline mx-1">Voté par : </span>
                  <router-link :to="{path: '/judgement/user/' + rating.user.id }"
                  >
                    {{ rating.user.username }}
                  </router-link>
                </p>
                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Crée le : </span>
                  {{ format(rating.user.createdAt) }}
                </p>
                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Derniere mise a jour le : </span>
                  {{ format(rating.user.updatedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  </section>

</template>

<style scoped>
</style>
