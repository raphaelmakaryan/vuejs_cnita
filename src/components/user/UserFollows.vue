<script>
import {format} from 'timeago.js'
import api from "@/assets/api.js"

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
    let data = await api.get(`users/${this.idUser}/follows`)
    this.follows = data.data
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.follows).length >= 1 && this.follows.member.length >= 1"
  >
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FOLLOW</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row usersItemsProfil p-2 my-2 align-items-center"
          v-for="follow in this.follows.member"
        >
          <div class="usersAvatarProfil me-2">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <router-link :to="{ path: '/user/' + follow.id }" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-white">
              {{ follow.username }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
