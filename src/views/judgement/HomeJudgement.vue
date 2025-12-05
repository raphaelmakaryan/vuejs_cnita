<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import FeedJudgement from "@/components/judgement/FeedJudgement.vue";
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
    HeaderJudgement,
    FeedJudgement,
    GenreJudgement
  }
}
</script>

<template>
  <HeaderJudgement/>
  <FeedJudgement v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"/>
  <GenreJudgement/>
</template>

<style scoped>

</style>
