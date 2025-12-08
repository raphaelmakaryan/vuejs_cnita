<script>
import {normalizeStyle, toRaw} from 'vue'
import api from "@/assets/api.js"
import {format} from 'timeago.js'
import ListInfosJudgement from '@/components/list/ListInfos.vue'
import ListMoviesJudgement from '@/components/list/ListMovies.vue'

export default {
  name: 'ListJudgement',
  components: {ListMoviesJudgement, ListInfosJudgement},
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
      let data = await api({
        url: `/custom_lists/${this.valueIdList}`,
        method: 'get',
      })
      this.list = data.data
    },
  },
  async mounted() {
    await this.getList()
  },
}
</script>

<template>
  <ListInfosJudgement :listData="list"/>
  <ListMoviesJudgement :listData="list"/>
</template>

<style scoped></style>
