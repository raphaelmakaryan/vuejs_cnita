<script>
import { toRaw } from 'vue'
import { format } from 'timeago.js'
import JudgementAPI from '@/components/JudgementAPI.vue'

export default {
  name: 'UserRating',
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      rating: [],
    }
  },
  async mounted() {
    this.rating = toRaw(
      await JudgementAPI.mounted('GET', `users/${this.idUser}/ratings`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.rating).length >= 1 && this.rating.member.length >= 1"
  >
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">VOTES</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-column border rounded p-2 my-2"
          v-for="rating in this.rating.member"
        >
          <router-link :to="{ path: '/movie/' + rating.movie.id }" class="text-decoration-none">
            <p class="fs-6 text-decoration-underline fw-bold text-black">
              {{ rating.movie.title }}
            </p>
          </router-link>
          <p>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              class="iconRating"
              viewBox="0 0 24 24"
              fill="#f5c518"
              role="presentation"
            >
              <path
                d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"
              ></path>
            </svg>
            {{ rating.note }} / 10
          </p>
          <p>
            <span class="text-decoration-underline me-1"> Crée le : </span>
            {{ format(rating.createdAt) }}
          </p>
          <p>
            <span class="text-decoration-underline me-1"> Derniere mise a jour le : </span>
            {{ format(rating.updateddAt) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
