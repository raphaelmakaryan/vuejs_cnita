<script>
import {toRaw} from "vue";
import JudgementApi from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";
import {format} from "timeago.js";

export default {
  name: "FeedJudgement",
  computed: {
    VueCookies() {
      return VueCookies
    }
  },
  data() {
    return {
      feeds: [],
      feedSpecifically: []
    }
  },
  methods: {
    format,
    async getFeed() {
      this.feeds = toRaw(await JudgementApi.mounted("GET", "feed", "", undefined, VueCookies.get('tokenUser')))
    },
    async linkSpecifically(value, data) {
      switch (value) {
        case "collection":
          return "/judgement/list/" + data.data.id
        case "review":
          return "/judgement/movie/" + +data.data.movie.id
        case "rating":
          return "/judgement/movie/" + data.data.movie.id
      }
    },
    async typeVerification(value) {
      switch (value) {
        case "rating":
          return "un nouveau vote"
        default:
          return "une nouvelle " + value
      }
    },
    async getSpecifically() {
      for (const feed of this.feeds.items) {
        this.feedSpecifically.push({
          type: await this.typeVerification(feed.type.toLowerCase()),
          created: format(feed.createdAt),
          user: feed.data.user.username,
          userId: feed.data.user.id,
          link: await this.linkSpecifically(feed.type.toLowerCase(), feed),
        })
      }
    },
  },
  async mounted() {
    await this.getFeed();
    await this.getSpecifically();
  }
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2">ARTICLES RECENTS</p>
          <hr>
        </div>
      </div>
      <div class="row my-2">
        <div
          class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 my-2 d-flex align-items-center flex-column"
          v-for="feed in this.feedSpecifically">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">
                <router-link :to="{path: '/judgement/user/' + feed.userId}">{{
                    feed.user
                  }}
                </router-link>
                a crée {{ feed.type }} !
              </h5>
              <p class="card-text">Date de creation : {{ feed.created }}</p>
              <router-link class="btn btn-primary w-100" :to="feed.link">Voir</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
