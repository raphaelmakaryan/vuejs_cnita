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
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">INFORMATIONS DE LA LISTE</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2 card p-3">
        <div class="col-12 my-2">
          <p class="fs-6 text-white">Nom de la liste :</p>
          <p class="fs-6 text-secondary">{{ listData.title }}</p>
          <hr />
        </div>
        <div class="col-12 my-2">
          <p class="fs-6 text-white">Créé le :</p>
          <p class="fs-6 text-secondary">{{ format(listData.createdAt) }}</p>
          <hr />
        </div>
        <div class="col-12 my-2">
          <p class="fs-6 text-white">Dernière mise à jour le :</p>
          <p class="fs-6 text-secondary">{{ format(listData.updatedAt) }}</p>
          <hr />
        </div>
        <div class="col-12 my-2">
          <p class="fs-6 text-white">Créé par :</p>
          <router-link
            :to="{ path: '/user/' + listData.user.id }"
            class="text-decoration-none color_yellow ms-1"
          >
            {{ listData.user.username }}
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
}
</style>
