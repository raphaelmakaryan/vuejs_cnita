<script>
import api from "@/assets/api.js"
import {format} from 'timeago.js'
import ListInfosJudgement from '@/components/list/ListInfos.vue'
import ListMoviesJudgement from '@/components/list/ListMovies.vue'

export default {
  name: 'ListJudgement',
  components: {ListMoviesJudgement, ListInfosJudgement},
  data() {
    return {
      list: [],
    }
  },
  methods: {
    format,
    async getList() {
      let data = await api.get(`/custom_lists/${this.$route.params.id}`)
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
