<script>
import {format} from 'timeago.js'
import {toRaw} from 'vue'
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import Notification from '@/components/Notification.vue'
import router from '@/router/index.js'

export default {
  name: 'UserList',
  components: {Notification},
  data() {
    return {
      list: [],
      valueNotification: null,
      textNotification: null,
    }
  },
  methods: {
    format,
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = `Vous avez supprimez la collection : ${this.list.member.title} !`
      }
    },
    async functionDelete(id) {
      let data = await api({
        url: `custom_lists/${id}`,
        method: 'delete',
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
    },
  },
  async mounted() {
    let data = await api.get(`users/${VueCookies.get('idUser')}/collections`)
    this.list = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.list).length >= 1 && this.list.member.length >= 1">
    <div class="container">
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
      <div class="row d-flex flex-column flex-lg-row justify-content-between">
        <div class="col-12 col-sm-12 col-md-12 col-lg-6">
          <p class="fs-2 fw-bold mt-3 m-0 titleSeparation">VOS COLLECTIONS</p>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-6 d-flex align-items-end flex-column justify-content-center"
        >
          <router-link :to="{ path: '/profil/list/create' }" class="btn btn-success">
            Ajouter
          </router-link>
        </div>
        <div class="col-12">
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div
          class="col-12 d-flex flex-row align-items-center justify-content-between lotItemsProfil p-2 my-2"
          v-for="list in this.list.member"
        >
          <div>
            <router-link :to="{ path: '/list/' + list.id }" class="text-decoration-none">
              <p class="fs-6 m-0 text-decoration-underline fw-bold text-white">{{ list.title }}</p>
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
              @click="functionDelete(list.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
