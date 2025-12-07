<script>
import { toRaw } from 'vue'
import JudgementApi from '@/components/JudgementAPI.vue'
import VueCookies from 'vue-cookies'
import FeedLogic from './FeedLogic.vue'

export default {
  name: 'FeedJudgement',
  components: { FeedLogic },
  data() {
    return {
      feeds: [],
    }
  },
  async mounted() {
    const response = await JudgementApi.mounted(
      'GET',
      'feed',
      '',
      undefined,
      VueCookies.get('tokenUser'),
    )
    this.feeds = toRaw(response)
  },
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 text-uppercase titleSeparation">ARTICLES Récents</p>
          <hr />
        </div>
      </div>
      <div class="row my-2">
        <FeedLogic :feedData="this.feeds" />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
