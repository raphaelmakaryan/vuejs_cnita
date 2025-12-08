<script>
import { format } from 'timeago.js'
import { toRaw } from 'vue'
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'

export default {
  name: 'UserFollowers',
  data() {
    return {
      followers: [],
    }
  },
  methods: {
    format,
  },
  async mounted() {
    this.followers = toRaw(
      await api(
        'GET',
        `users/${VueCookies.get('idUser')}/followers`,
        '',
        undefined,
        '',
      ),
    )
  },
}
</script>

<template>
  <section
    class="my-5"
    v-if="Object.keys(this.followers).length >= 1 && this.followers.member.length >= 1"
  >
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3 titleSeparation">ILS VOUS SUIVENTS</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row user-item p-2 my-2 align-items-center"
          v-for="follower in this.followers.member"
        >
          <div class="user-avatar me-2">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </div>
          <router-link :to="{ path: '/user/' + follower.id }" class="text-decoration-none">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-white">
              {{ follower.username }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.user-item {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.user-avatar {
  width: 48px;
  height: 48px;
  min-width: 48px;
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-yellow-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-yellow-primary);
}

.user-avatar svg {
  width: 60%;
  height: 60%;
}
</style>
