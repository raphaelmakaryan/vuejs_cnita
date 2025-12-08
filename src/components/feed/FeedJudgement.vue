<script>
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import FeedLogic from './FeedLogic.vue'

export default {
  name: 'FeedJudgement',
  components: {FeedLogic},
  data() {
    return {
      feeds: [],
    }
  },
  async mounted() {
    let data = await api({
      url: '/feed',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
      }
    })
    this.feeds = data.data
  },
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 text-uppercase titleSeparation">ARTICLES Récents</p>
          <hr class="z--1"/>
        </div>
      </div>
      <div class="row my-2">
        <FeedLogic :feedData="this.feeds"/>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
