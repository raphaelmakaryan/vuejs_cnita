<script>
import HeaderJudgement from '@/components/header/HeaderJudgement.vue'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import VueCookies from 'vue-cookies'
import { th } from 'timeago.js/lib/lang/index.d.ts'

export default {
  name: 'EditVotesJudgement',
  data() {
    return {
      valueIdVote: this.$route.params.id,
      dataMovie: {},
      newBody: {
        note: 0,
      },
      rating: [],
    }
  },
  methods: {
    async getRating() {
      this.rating = toRaw(
        await JudgementAPI.mounted('GET', `ratings/${this.valueIdVote}`, '', undefined, ''),
      )
    },
    async status(data) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert('Vous avec modifié votre vote !')
        window.location.reload()
      }
    },
    async updateRating() {
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `ratings/${this.valueIdVote}`,
          this.newBody,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
      )
    },
  },
  async mounted() {
    await this.getRating()
    this.dataMovie = {
      title: await this.rating.movie.title,
      poster: await this.rating.movie.poster,
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

  <form @submit.prevent="updateRating">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              MODIFIER LE VOTE POUR LE FILM :
              <span class="fw-bold fst-italic">
                {{ this.dataMovie.title }}
              </span>
            </p>
            <hr />
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newRating" class="form-label">Nouvelle note</label>
            <input
              type="number"
              class="form-control"
              id="newRating"
              v-model="newBody.note"
              aria-valuemin="1"
              aria-valuemax="10"
              required
              :placeholder="this.rating.note"
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

<style scoped></style>
