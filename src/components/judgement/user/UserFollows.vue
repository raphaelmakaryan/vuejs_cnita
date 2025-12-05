<script>
import { toRaw } from 'vue'
import { format } from 'timeago.js'
import JudgementAPI from '@/components/API/JudgementAPI.vue'

export default {
  name: 'UserFollows',
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      follows: [],
    }
  },
  async mounted() {
    this.follows = toRaw(
      await JudgementAPI.mounted('GET', `users/${this.idUser}/follows`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.follows).length >= 1 && this.follows.member.length >= 1"
  >
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FOLLOW</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-column border rounded p-2 my-2"
          v-for="follow in this.follows.member"
        >
          <router-link :to="{ path: '/user/' + follow.id }" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">
              {{ follow.username }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
