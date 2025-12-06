<script>
import FeedJudgement from '@/components/feed/FeedJudgement.vue'
import GenreJudgement from '@/components/genre/GenreJudgement.vue'
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
  <FeedJudgement v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')" />
  <GenreJudgement />
</template>

<style scoped></style>
