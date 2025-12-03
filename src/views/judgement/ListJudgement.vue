<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {normalizeStyle, toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import {format} from 'timeago.js';

export default {
  name: "ListJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdList: this.$route.params.id,
      list: [],
      movies: []
    };
  },
  methods: {
    format,
    async getList() {
      this.list = toRaw(await JudgementAPI.mounted("GET", `custom_lists/${this.valueIdList}`, "", ""))
    }
  },
  async mounted() {
    await this.getList();
  }
}
</script>

<template>
  <HeaderJudgement/>


  <section class="my-5" v-if="Object.keys(this.list).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            INFORMATIONS DE LA LISTE
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
            Nom de la liste :
          </span>
            {{ list.title }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
            Crée le :
          </span>
            {{ format(list.createdAt) }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
            Dernière mise a jour le :
          </span>
            {{ format(list.updatedAt) }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
            Crée par :
          </span>
            <router-link :to="{path: '/judgement/user/' + list.user.id }"
                         class="text-decoration-none">
              {{ list.user.username }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5" v-if="Object.keys(this.list.entries).length > 0">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            FILMS AJOUTER
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2 d-flex flex-column flex-md-row align-items-center">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="movie in this.list.entries">
          <router-link :to="{path: '/judgement/movie/' + movie.movie.id }"
                       class="text-decoration-none">
            <div class="card my-2" style="width: 18rem;">
              <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.title">
              <div class="card-body">
                <h5 class="card-title">{{ movie.movie.title }}</h5>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
