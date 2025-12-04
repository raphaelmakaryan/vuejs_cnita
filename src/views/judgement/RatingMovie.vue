<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";

export default {
  name: "RatingJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      movie: [],
      newRating: null,
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
          "note": this.newRating,
        }
      await this.status(await JudgementAPI.mounted("POST", `ratings`, body, undefined, VueCookies.get('tokenUser')));
    },
    async status(data) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert("Vous avez crée le vote !");
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
              CREER UN VOTE POUR LE FILM : <span
              class="fw-bold fst-italic">
              {{ this.movie.title }}
            </span>
            </p>
            <hr>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newRating" class="form-label">Nouvelle note</label>
            <input type="number" class="form-control" id="newRating" v-model="newRating"
                   aria-valuemin="1" aria-valuemax="10" required
            >
          </div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Mettre a jour</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped>

</style>
