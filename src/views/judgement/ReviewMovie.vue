<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";

export default {
  name: "ReviewJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      movie: [],
      newReview: null,
    }
  },
  methods: {
    async getMovie() {
      this.movie = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}`, "", undefined, ""))
    },
    async createRating() {
      let body =
        {
          "movie": "/api/movies/" + this.valueIdMovie,
          "user": "/api/users/" + VueCookies.get('idUser'),
          "content": this.newReview,
        }
      await this.status(await JudgementAPI.mounted("POST", `reviews`, body, undefined, VueCookies.get('tokenUser')));
    },
    async status(data) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert("Vous avez crée la review !");
        window.location.reload();
      }
    },
  },
  async mounted() {
    await this.getMovie();
  }
}
</script>

<template>
  <HeaderJudgement/>


  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex flex-column align-items-center">
          <img :src="this.movie.poster" class="img-fluid w-25" :alt="this.movie.title">
        </div>
      </div>
    </div>
  </section>


  <form @submit.prevent="createRating">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              CREER UNE REVIEW POUR LE FILM : <span
              class="fw-bold fst-italic">
              {{ this.movie.title }}
            </span>
            </p>
            <hr>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-12">
            <label for="newReview" class="form-label">Nouvelle review</label>
            <input type="text" class="form-control" id="newReview" v-model="newReview"
                   minlength="5" required placeholder="Ce film étais géniale !"/>
          </div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Crée la review</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped>

</style>
