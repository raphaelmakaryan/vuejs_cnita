<script>
import { format } from 'timeago.js'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'UserReview',
  data() {
    return {
      review: [],
    }
  },
  methods: {
    format,
    async functionDelete(id, name, texte) {
      await this.status(
        await JudgementAPI.mounted(
          'DELETE',
          `${name}/${id}`,
          '',
          undefined,
          VueCookies.get('tokenUser'),
        ),
        texte,
      )
    },
    async status(data, texte) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert(texte)
        window.location.reload()
      }
    },
  },
  async mounted() {
    this.review = toRaw(
      await JudgementAPI.mounted(
        'GET',
        `users/${VueCookies.get('idUser')}/reviews`,
        '',
        undefined,
        '',
      ),
    )
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.review).length >= 1 && this.review.member.length >= 1"
  >
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">VOS REVIEWS</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between p-2 my-2 border"
          v-for="review in this.review.member"
        >
          <div>
            <router-link :to="{ path: '/movie/' + review.movie.id }" class="text-decoration-none">
              <p class="fs-6 text-decoration-underline fw-bold text-black">
                {{ review.movie.title }}
              </p>
            </router-link>
            <p class="font-monospace">{{ review.content }}</p>
          </div>
          <div>
            <router-link
              :to="{ path: '/profil/review/' + review.id + '/edit' }"
              class="btn btn-secondary mx-1"
            >
              <i class="bi bi-pencil"></i>
            </router-link>
            <button
              type="button"
              class="btn btn-danger mx-1"
              @click="
                functionDelete(
                  review.id,
                  'reviews',
                  'Vous avez supprimez la review pour le film : ' + review.movie.title + '!',
                )
              "
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
