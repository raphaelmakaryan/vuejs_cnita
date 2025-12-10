<script>
import {format} from 'timeago.js'
import api from "@/assets/api.js"

export default {
  name: 'UserCollections',
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    let data = await api.get(`users/${this.idUser}/collections`)
    this.list = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.list).length >= 1 && this.list.member.length >= 1">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3 m-0 titleSeparation">COLLECTIONS</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between lotItemsProfil p-2 my-2"
          v-for="list in this.list.member"
        >
          <router-link :to="{ path: '/list/' + list.id }" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-white">{{ list.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
