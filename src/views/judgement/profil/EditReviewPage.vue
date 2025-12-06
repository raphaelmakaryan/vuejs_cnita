<script>
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'EditReviewJudgement',
  data() {
    return {
      valueIdReview: this.$route.params.id,
      dataMovie: {},
      newBody: {
        content: '',
      },
      review: [],
      newReview: null,
    }
  },
  methods: {
    async getReview() {
      this.review = toRaw(
        await JudgementAPI.mounted('GET', `reviews/${this.valueIdReview}`, '', undefined, ''),
      )
    },
    async status(data) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert('Vous avec modifié votre review !')
        window.location.reload()
      }
    },
    async updateReview() {
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `reviews/${this.valueIdReview}`,
          this.newBody,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
      )
    },
  },
  async mounted() {
    await this.getReview()
    this.dataMovie = {
      title: await this.review.movie.title,
      poster: await this.review.movie.poster,
    }
  },
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 d-flex flex-column align-items-center">
          <img :src="this.dataMovie.poster" class="img-fluid w-25" :alt="this.dataMovie.title" />
        </div>
      </div>
    </div>
  </section>

  <form @submit.prevent="updateReview">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              MODIFIER LA REVIEW POUR LE FILM :
              <span class="fw-bold fst-italic">
                {{ this.dataMovie.title }}
              </span>
            </p>
            <hr />
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newReview" class="form-label">Nouvelle review</label>
            <input
              type="text"
              class="form-control"
              id="newReview"
              v-model="newBody.content"
              minlength="3"
              required
              :placeholder="this.review.content"
            />
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
@import 'bootstrap-icons/font/bootstrap-icons';
</style>
