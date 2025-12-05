<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";
import {format} from 'timeago.js';

export default {
  name: "ProfilJudgement",
  data() {
    return {
      user: [],
      list: [],
      rating: [],
      review: [],
      followers: [],
      follows: [],
      feed: []
    }
  },
  methods: {
    format,
    async getUser() {
      this.user = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}`, "", undefined, ""))
    },
    async getList() {
      this.list = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}/collections`, "", undefined, ""))
    },
    async getRating() {
      this.rating = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}/ratings`, "", undefined, ""))
    },
    async getReviews() {
      this.review = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}/reviews`, "", undefined, ""))
    },
    async getFollowers() {
      this.followers = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}/followers`, "", undefined, ""))
    },
    async getFollows() {
      this.follows = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}/follows`, "", undefined, ""))
    },
    async functionDelete(id, name, texte) {
      await this.status(await JudgementAPI.mounted("DELETE", `${name}/${id}`, "", undefined, VueCookies.get('tokenUser')), texte);
    },
    async status(data, texte) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert(texte);
        window.location.reload();
      }
    },
  },
  components: {HeaderJudgement},
  async mounted() {
    await this.getUser();
    await this.getList();
    await this.getRating();
    await this.getReviews();
    await this.getFollowers();
    await this.getFollows();
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section class="mt-5">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            PROFIL
          </p>
          <hr>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-6"><span class="text-decoration-underline">
              Nom :
            </span>
            {{ user.username }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-2">
          <router-link to="/judgement/profil/edit" class="btn btn-primary">
            Modifier votre profil
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5"
           v-if="Object.keys(this.followers).length >= 1 && this.followers.member.length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            ILS VOUS SUIVENTS
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 d-flex flex-column border rounded p-2 my-2"
             v-for="follower in this.followers.member">
          <router-link :to="{path: '/judgement/user/' + follower.id}" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{
                follower.username
              }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5"
           v-if="Object.keys(this.follows).length >= 1 && this.follows.member.length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            VOUS SUIVEZ
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 d-flex flex-column border rounded p-2 my-2"
             v-for="follow in this.follows.member">
          <router-link :to="{path: '/judgement/user/' + follow.id}" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{
                follow.username
              }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>

  <section class="my-5" v-if="Object.keys(this.list).length >= 1 && this.list.member.length >= 1">
    <div class="container border rounded">
      <div class="row d-flex flex-column flex-lg-row justify-content-between">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <p class="fs-2 fw-bold mt-3">
            VOS COLLECTIONS
          </p>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-6 d-flex align-items-end flex-column justify-content-center">
          <router-link :to="{path: '/judgement/profil/list/create'}"
                       class="btn btn-success">
            Ajouter
          </router-link>
        </div>
        <div class="col-12">
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between border rounded p-2 my-2"
          v-for="list in this.list.member">
          <div>
            <router-link :to="{path: '/judgement/list/' + list.id}"
                         class="text-decoration-none">
              <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{
                  list.title
                }}</p>
            </router-link>
          </div>
          <div>
            <router-link :to="{path: '/judgement/profil/list/' + list.id + '/edit'}"
                         class="btn btn-secondary mx-1">
              <i class="bi bi-pencil"></i>
            </router-link>
            <button type="button"
                    class="btn btn-danger mx-1"
                    @click="functionDelete(list.id,'custom_lists', 'Vous avez supprimez la collection : ' + list.title + '!')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
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
            VOS VOTES
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between p-2 my-2 border"
          v-for="rating in this.rating.member">
          <div>

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
          </div>
          <div>
            <router-link :to="{path: '/judgement/profil/rating/' + rating.id + '/edit'}"
                         class="btn btn-secondary mx-1">
              <i class="bi bi-pencil"></i>
            </router-link>
            <button type="button"
                    class="btn btn-danger mx-1"
                    @click="functionDelete(rating.id,'ratings', 'Vous avez supprimez le vote pour le film : ' +  rating.movie.title + '!')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
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
            VOS REVIEWS
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between p-2 my-2 border"
          v-for="review in this.review.member">
          <div>
            <router-link :to="{path: '/judgement/movie/' + review.movie.id}"
                         class="text-decoration-none">
              <p class="fs-6 text-decoration-underline fw-bold text-black">{{
                  review.movie.title
                }}</p>
            </router-link>
            <p class="font-monospace">{{ review.content }}</p>
          </div>
          <div>
            <router-link :to="{path: '/judgement/profil/review/' + review.id + '/edit'}"
                         class="btn btn-secondary mx-1">
              <i class="bi bi-pencil"></i>
            </router-link>
            <button type="button"
                    class="btn btn-danger mx-1"
                    @click="functionDelete(review.id,'reviews', 'Vous avez supprimez la review pour le film : ' +  review.movie.title + '!')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
