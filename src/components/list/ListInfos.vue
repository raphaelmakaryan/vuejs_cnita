<script>
import { format } from 'timeago.js'

export default {
  name: 'ListInfosJudgement',
  props: {
    listData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    format,
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.listData).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">INFORMATIONS DE LA LISTE</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline"> Nom de la liste :</span>  {{ listData.title }}
          </p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline"> Crée le :</span>
            {{ format(listData.createdAt) }}
          </p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline"> Dernière mise a jour le :</span>
            {{ format(listData.updatedAt) }}
          </p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-6">
            <span class="text-decoration-underline">Crée par :</span>
            <router-link :to="{ path: '/user/' + listData.user.id }" class="text-decoration-none color_yellow ms-1">
               {{ listData.user.username }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
