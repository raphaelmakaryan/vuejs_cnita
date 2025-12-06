<script>
import DirectorInfosJudgement from '@/components/director/DirectorInfos.vue'
import DirectorMoviesJudgement from '@/components/director/DirectorMovies.vue'

export default {
  name: 'DirectorJudgement',
  components: { DirectorMoviesJudgement, DirectorInfosJudgement },
  data() {
    return {
      valueIdDirector: this.$route.params.id,
    }
  },
}
</script>

<template>
  <DirectorInfosJudgement :idDirector="valueIdDirector" />
  <DirectorMoviesJudgement :idDirector="valueIdDirector" />
</template>

<style scoped></style>
