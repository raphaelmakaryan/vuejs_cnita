<script>
import CastInfosJudgement from '@/components/cast/CastInfos.vue'
import CastMoviesJudgement from '@/components/cast/CastMovies.vue'

export default {
  name: 'CastJudgement',
  components: { CastMoviesJudgement, CastInfosJudgement },
  data() {
    return {
      valueIdCast: this.$route.params.id,
    }
  },
}
</script>

<template>
  <CastInfosJudgement :idCast="valueIdCast" />
  <CastMoviesJudgement :idCast="valueIdCast" />
</template>

<style scoped></style>
