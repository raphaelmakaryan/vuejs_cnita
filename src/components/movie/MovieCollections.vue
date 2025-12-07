<script>
import VueCookies from 'vue-cookies'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import { format } from 'timeago.js'

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
    this.listsData = toRaw(
      await JudgementAPI.mounted(
        'GET',
        `movies/${this.idMovie}/custom_list_entries?page=1&itemsPerPage=30`,
        '',
        undefined,
        '',
      ),
    )
    console.log(this.listsData)
  },
}
</script>

<template>
  <div
    class="col-5 border rounded m-2"
    v-if="this.listsData.totalItems >= 1"
    id="collectionsMovie"
  >
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-5 fw-bold text-center">Collections</p>
        </div>
      </div>
      <div class="row my-2">
        <div
          class="col-12 d-flex flex-column border rounded my-2"
          v-for="list in this.listsData.member"
        >
          <router-link :to="{ path: '/list/' + list.id }">
            <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">
              {{ list.customList.title }}
            </p>
          </router-link>

          <p class="fs-6 m-0 text-black">
            <span class="text-decoration-underline me-1">Crée par : </span>
            <router-link :to="{ path: '/user/' + list.customList.user.id }"
              >{{ list.customList.user.username }}
            </router-link>
          </p>

          <p class="fs-6 m-0">
            <span class="text-decoration-underline">Crée le : </span
            >{{ format(list.customList.createdAt) }}
          </p>
          <p class="fs-6 m-0">
            <span class="text-decoration-underline">Derniere mise a jour le : </span
            >{{ format(list.customList.updatedAt) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
