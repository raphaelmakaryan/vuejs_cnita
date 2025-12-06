<script>
import { format } from 'timeago.js'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'UserList',
  data() {
    return {
      list: [],
    }
  },
  methods: {
    format,
    async functionDelete(id, name, texte) {
      await this.status(
        await JudgementAPI.mounted(
          'DELETE',
          `${name}/${id}`,
          '',
          undefined,
          VueCookies.get('tokenUser'),
        ),
        texte,
      )
    },
    async status(data, texte) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert(texte)
        window.location.reload()
      }
    },
  },
  async mounted() {
    this.list = toRaw(
      await JudgementAPI.mounted(
        'GET',
        `users/${VueCookies.get('idUser')}/collections`,
        '',
        undefined,
        '',
      ),
    )
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.list).length >= 1 && this.list.member.length >= 1">
    <div class="container border rounded">
      <div class="row d-flex flex-column flex-lg-row justify-content-between">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <p class="fs-2 fw-bold mt-3">VOS COLLECTIONS</p>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-6 d-flex align-items-end flex-column justify-content-center"
        >
          <router-link :to="{ path: '/profil/list/create' }" class="btn btn-success">
            Ajouter
          </router-link>
        </div>
        <div class="col-12">
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between border rounded p-2 my-2"
          v-for="list in this.list.member"
        >
          <div>
            <router-link :to="{ path: '/list/' + list.id }" class="text-decoration-none">
              <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{ list.title }}</p>
            </router-link>
          </div>
          <div>
            <router-link
              :to="{ path: '/profil/list/' + list.id + '/edit' }"
              class="btn btn-secondary mx-1"
            >
              <i class="bi bi-pencil"></i>
            </router-link>
            <button
              type="button"
              class="btn btn-danger mx-1"
              @click="
                functionDelete(
                  list.id,
                  'custom_lists',
                  'Vous avez supprimez la collection : ' + list.title + '!',
                )
              "
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
