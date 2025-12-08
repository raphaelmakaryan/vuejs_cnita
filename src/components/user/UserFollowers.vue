<script>
import {toRaw} from 'vue'
import {format} from 'timeago.js'
import api from "@/assets/api.js"

export default {
  name: 'UserFollowers',
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      followers: [],
    }
  },
  async mounted() {
    let data = await api({
      url: `users/${this.idUser}/followers`,
      method: 'get',
    })
    this.followers = data.data
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.followers).length >= 1 && this.followers.member.length >= 1"
  >
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FOLLOWERS</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-column border rounded p-2 my-2"
          v-for="follower in this.followers.member"
        >
          <router-link
            :to="{ path: '/user/' + follower.id }"
            class="text-decoration-none"
          >
            <p class="fs-6 m-0 text-decoration-underline fw-bold color_yellow">
              {{ follower.username }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
