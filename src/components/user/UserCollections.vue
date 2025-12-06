<script>
import { toRaw } from 'vue'
import { format } from 'timeago.js'
import JudgementAPI from '@/components/JudgementAPI.vue'

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
    this.list = toRaw(
      await JudgementAPI.mounted('GET', `users/${this.valueIdUser}/collections`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.list).length >= 1 && this.list.member.length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">COLLECTIONS</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-column border rounded p-2 my-2"
          v-for="list in this.list.member"
        >
          <router-link :to="{ path: '/judgement/list/' + list.id }" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{ list.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
