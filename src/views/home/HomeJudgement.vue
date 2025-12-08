<script>
import FeedJudgement from '@/components/feed/FeedJudgement.vue'
import GenreJudgement from '@/components/genre/home/GenreJudgement.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'HomeJudgement',
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  components: {
    FeedJudgement,
    GenreJudgement,
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container p-5">
      <div class="row">
        <div class="col-12 text-center text-white">
          <h1>Welcome to Judgement</h1>
        </div>
        <div class="col-12 text-center">
          <p class="text-secondary">Discover and share your favorite movies.</p>
        </div>
      </div>
    </div>
  </section>
  <FeedJudgement v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"/>
  <GenreJudgement/>
</template>

<style scoped>
.container {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.3s ease;
}
</style>
