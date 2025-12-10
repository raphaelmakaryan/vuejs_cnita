<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import {format} from 'timeago.js'

export default {
  name: 'MovieCollections',
  data() {
    return {
      listsData: [],
    }
  },
  props: {
    idMovie: {
      type: String,
      required: true,
    },
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  methods: {
    format,
  },
  async mounted() {
    let data = await api.get(`movies/${this.idMovie}/custom_list_entries`, {
      params: {
        page: 1,
        itemsPerPage: 30,
      },
    })
    this.listsData = data.data
  },
}
</script>

<template>
  <div class="col-12" v-if="this.listsData.totalItems >= 1" id="collectionsMovie">
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 text-uppercase titleSeparation">Collections</p>
          <hr/>
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12 card" v-for="list in this.listsData.member">
          <div class="container-fluid">
            <div class="row my-3">
              <div class="col-6 d-flex flex-row align-items-center">
                <router-link
                  :to="{ path: '/list/' + list.customList.id }"
                  class="fs-5 m-0 text-decoration-none fw-bold text-white"
                >
                  {{ list.customList.title }}
                </router-link>
              </div>
              <div class="col-6 d-flex flex-row align-items-center justify-content-end">
                <p class="fs-6 text-secondary m-0">{{ format(list.customList.createdAt) }}</p>
              </div>
            </div>
            <div class="row my-3">
              <div class="col-12 d-flex flex-row align-items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" class="user me-1">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  />
                </svg>
                <router-link
                  :to="{ path: '/user/' + list.customList.user.id }"
                  class="text-decoration-none ms-1 username"
                >
                  {{ list.customList.user.username }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.user {
  width: 40px;
  height: 40px;
  min-width: 40px;
  background: var(--color-bg-elevated);
  border: 2px solid var(--color-yellow-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-yellow-primary);
}

.username {
  color: white;
}

.username:hover {
  color: var(--color-yellow-hover);
}
</style>
