<script>
import HeaderJudgement from "@/components/HeaderJudgement.vue";
import JudgementAPI from "@/components/JudgementAPI.vue";
import { format } from 'timeago.js';
import { toRaw } from "vue";
import VueCookies from "vue-cookies";
import { tr } from "timeago.js/lib/lang/index.d.ts";

export default {
  name: "MovieJudgement",
  components: { HeaderJudgement },
  computed: {
    VueCookies() {
      return VueCookies
    }
  },
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      moviePublic: [],
      listsPublic: [],
      reviewPublic: [],
      ratingsPublic: [],
      allCollectionPrivate: [],
      collectionsSelectPrivate: [],
      newCollectionPrivate: [],
      chooseAddCollectionPrivate: null,
      allRatingsMoviePublic: [],
      ratingsUserPrivate: null,
      reviewUserPrivate: null,
    };
  },
}
</script>

<template>

  <section id="otherDetail" class="my-5">
    <div class="container-fluid">



      <!-- 1 -->
      <div class="row my-2">
        <div class="col-lg-1"></div>


        <!-- VOTES -->
        <div class="col-5 border rounded m-2" v-if="Object.keys(this.ratingsPublic).length >= 1" id="ratingMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Votes</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2" v-for="rating in this.ratingsPublic">
                <p class="fs-6 m-0 text-decoration-underline fw-bold">{{ rating.note }} /
                  10</p>
                <p class="fs-6 m-0"><span class="text-decoration-underline mx-1">Voté par : </span>
                  <router-link :to="{ path: '/user/' + rating.user.id }">
                    {{ rating.user.username }}
                  </router-link>
                </p>
                <p class="fs-6 m-0"><span class="text-decoration-underline">Crée le : </span>
                  {{ format(rating.user.createdAt) }}
                </p>
                <p class="fs-6 m-0"><span class="text-decoration-underline">Derniere mise a jour le : </span>
                  {{ format(rating.user.updatedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- VOTES -->

        <div class="col-lg-1"></div>
      </div>
      <!-- 1 -->



      <!-- 2 -->
      <div class="row my-2">
        <div class="col-lg-1"></div>
        <div class="col-10 border rounded m-2" v-if="this.reviewPublic.totalItems >= 1" id="collectionsMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Reviews</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2" v-for="review in this.reviewPublic.member">
                <router-link :to="{ path: '/user/' + review.user.id }">
                  <p class="fs-6 my-2 text-decoration-underline fw-bold text-black">{{
                    review.user.username
                  }}</p>
                </router-link>
                <p class="font-monospace">{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
      <!-- 2 -->
    </div>
  </section>

</template>

<style scoped></style>
