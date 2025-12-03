<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {normalizeStyle, toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import {format} from 'timeago.js';

export default {
  name: "UserJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      valueIdUser: this.$route.params.id,
      user: [],
      list: [],
      rating: [],
      review: []
    };
  },
  methods: {
    format,
    async getUser() {
      this.user = toRaw(await JudgementAPI.mounted("GET", `users/${this.valueIdUser}`, ""))
    },
    async getList() {
      this.list = toRaw(await JudgementAPI.mounted("GET", `users/${this.valueIdUser}/collections`, ""))
    },
    async getRating() {
      this.rating = toRaw(await JudgementAPI.mounted("GET", `users/${this.valueIdUser}/ratings`, ""))
    },
    async getReviews() {
      this.review = toRaw(await JudgementAPI.mounted("GET", `users/${this.valueIdUser}/reviews`, ""))
    }
  },
  async mounted() {
    await this.getUser();
    await this.getList();
    await this.getRating();
    await this.getReviews();
  }
}
</script>

<template>
  <HeaderJudgement/>


  <section class="my-5" v-if="Object.keys(this.user).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            INFORMATIONS SUR L'UTILISATEUR
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
              Nom :
            </span>
            {{ user.username }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
              Crée le :
            </span>
            {{ format(user.createdAt) }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
              Derniere mise a jour le :
            </span>
            {{ format(user.updatedAt) }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5" v-if="Object.keys(this.list).length >= 1 && this.list.member.length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            COLLECTIONS
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 d-flex flex-column border rounded p-2 my-2"
             v-for="list in this.list.member">
          <router-link :to="{path: '/judgement/list/' + list.id}" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{
                list.title
              }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5"
           v-if="Object.keys(this.rating).length >= 1 && this.rating.member.length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            VOTES
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 d-flex flex-column border rounded p-2 my-2"
             v-for="rating in this.rating.member">
          <router-link :to="{path: '/judgement/movie/' + rating.movie.id}"
                       class="text-decoration-none">
            <p class="fs-6 text-decoration-underline fw-bold text-black">{{
                rating.movie.title
              }}</p>
          </router-link>
          <p>
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"
                 class="iconRating" viewBox="0 0 24 24"
                 fill="#f5c518" role="presentation">
              <path
                d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
            </svg>
            {{ rating.note }} / 10
          </p>
          <p><span class="text-decoration-underline me-1">
              Crée le :
            </span> {{ format(rating.createdAt) }}</p>
          <p><span class="text-decoration-underline me-1">
              Derniere mise a jour le :
            </span> {{ format(rating.updateddAt) }}</p>

        </div>
      </div>
    </div>
  </section>

  <section class="my-5"
           v-if="Object.keys(this.review).length >= 1 && this.review.member.length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            REVIEWS
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 d-flex flex-column border rounded p-2 my-2"
             v-for="review in this.review.member">
          <router-link :to="{path: '/judgement/movie/' + review.movie.id}"
                       class="text-decoration-none">
            <p class="fs-6 text-decoration-underline fw-bold text-black">{{
                review.movie.title
              }}</p>
          </router-link>
          <p class="font-monospace">{{ review.content }}</p>
          <p><span class="text-decoration-underline me-1">
              Crée le :
            </span> {{ format(review.createdAt) }}</p>
          <p><span class="text-decoration-underline me-1">
              Derniere mise a jour le :
            </span> {{ format(review.updateddAt) }}</p>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
