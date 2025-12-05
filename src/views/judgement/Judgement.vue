<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import FeedJudgement from "@/components/judgement/FeedJudgement.vue";
import GenreJudgement from "@/components/judgement/GenreJudgement.vue";

export default {
  name: "HomeJudgement",
  components: {
    HeaderJudgement,
    FeedJudgement,
    GenreJudgement
  }
}
</script>

<template>
  <HeaderJudgement/>
  <FeedJudgement/>
  <GenreJudgement/>
  <router-link to="/judgement/all-users" class="text-decoration-none">
    allUser
  </router-link>

</template>

<style scoped>

</style>
