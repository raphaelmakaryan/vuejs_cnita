<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";

export default {
  name: "EditVotesJudgement",
  data() {
    return {
      valueIdVote: this.$route.params.id,
      movie: [],
      rating: [],
      newRating: null,
    }
  },
  methods: {
    async getRating() {
      this.rating = toRaw(await JudgementAPI.mounted("GET", `ratings/${this.valueIdVote}`, "", undefined, ""))
    },
    async getMovie() {
      this.movie = await this.rating.movie
    },
    async status(data) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert("Vous avec modifié votre vote !");
        window.location.reload();
      }
    },
    async updateRating() {
      let body =
        {
          "note": this.newRating,
        }
      await this.status(await JudgementAPI.mounted("PATCH", `ratings/${this.valueIdVote}`, body, "application/merge-patch+json", VueCookies.get('tokenUser')));
    },
  },
  components: {HeaderJudgement},
  async mounted() {
    await this.getRating();
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


  <form @submit.prevent="updateRating">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              MODIFIER LE VOTE POUR LE FILM : <span
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
                   aria-valuemin="1" aria-valuemax="10" required :placeholder="this.rating.note"
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
@import "bootstrap-icons/font/bootstrap-icons";
</style>

