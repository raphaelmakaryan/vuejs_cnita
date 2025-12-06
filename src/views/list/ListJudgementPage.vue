<script>
import { normalizeStyle, toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import { format } from 'timeago.js'
import ListInfosJudgement from '@/components/list/ListInfos.vue'
import ListMoviesJudgement from '@/components/list/ListMovies.vue'

export default {
  name: 'ListJudgement',
  components: { ListMoviesJudgement, ListInfosJudgement },
  data() {
    return {
      valueIdList: this.$route.params.id,
      list: [],
      movies: [],
    }
  },
  methods: {
    format,
    async getList() {
      this.list = toRaw(
        await JudgementAPI.mounted('GET', `custom_lists/${this.valueIdList}`, '', undefined, ''),
      )
    },
  },
  async mounted() {
    await this.getList()
  },
}
</script>

<template>
  <ListInfosJudgement :listData="list" />
  <ListMoviesJudgement :listData="list" />
</template>

<style scoped></style>
