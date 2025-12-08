<script>
import {toRaw} from 'vue'
import {format} from 'timeago.js'
import api from "@/assets/api.js"

export default {
  name: 'UserInfo',
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      user: [],
    }
  },
  async mounted() {
    let data = await api({
      url: `/users/${this.idUser}`,
      method: 'get',
    })
    this.user = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.user).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">INFORMATIONS SUR L'UTILISATEUR</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline"> Nom : </span> {{ user.username }}
          </p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline"> Crée le : </span> {{ format(user.createdAt) }}
          </p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline"> Derniere mise a jour le : </span>
            {{ format(user.updatedAt) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
