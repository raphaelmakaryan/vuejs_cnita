<script>
import FeedJudgement from "@/components/judgement/feed/FeedJudgement.vue";
import GenreJudgement from "@/components/judgement/GenreJudgement.vue";
import VueCookies from "vue-cookies";

export default {
  name: "HomeJudgement",
  computed: {
    VueCookies() {
      return VueCookies
    }
  },
  components: {
    FeedJudgement,
    GenreJudgement
  }
}
</script>

<template>
  <FeedJudgement v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"/>
  <!--
  <GenreJudgement/>
  -->
</template>

<style scoped>

</style>
