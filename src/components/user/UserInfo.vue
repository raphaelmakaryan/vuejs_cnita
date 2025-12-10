<script>
import {format} from 'timeago.js'
import api from "@/assets/api.js"
import Subscribe from "@/components/user/Subscribe.vue";
import VueCookies from "vue-cookies";

export default {
  name: 'UserInfo',
  computed: {
    VueCookies() {
      return VueCookies
    }
  },
  components: {Suscribe: Subscribe},
  props: {
    idUser: Number,
  },
  methods: {
    format,
  },
  data() {
    return {
      user: [],
    }
  },
  async mounted() {
    let data = await api.get(`/users/${this.idUser}`)
    this.user = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.user).length >= 1">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">INFORMATIONS SUR L'UTILISATEUR</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2 card p-2">
        <div class="col-12 my-2">
          <p class="fs-5 fw-bold color_yellow"> Nom :</p>
          <p class="fs-6 text-secondary">{{ user.username }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-5 fw-bold color_yellow">Créé le :</p>
          <p class="fs-6 text-secondary">{{ format(user.createdAt) }}</p>
        </div>
        <div class="col-12 my-2">
          <p class="fs-5 fw-bold color_yellow">Derniere mise a jour le :</p>
          <p class="fs-6 text-secondary"> {{ format(user.updatedAt) }}</p>
        </div>
        <Suscribe
          :idUser="this.idUser"
          v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"
        />
      </div>
    </div>
  </section>
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
</style>
