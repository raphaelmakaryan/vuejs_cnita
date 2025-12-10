<script>
import VueCookies from 'vue-cookies'
import {toRaw} from 'vue'
import api from "@/assets/api.js"
import Notification from '@/components/Notification.vue'
import router from '@/router/index.js'

export default {
  name: 'UserSuscribe',
  components: {Notification},
  props: {
    idUser: Number,
  },
  data() {
    return {
      userConnectedFollow: null,
      valueNotification: null,
      textNotification: null,
    }
  },
  methods: {
    async forNotification(data, texte) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = texte
      }
    },
    async systemFollow(type) {
      let requestFollow
      let texte
      switch (type) {
        case 'follow':
          requestFollow = await api.post(`users/${VueCookies.get('idUser')}/follow/${this.idUser}`, {
            headers: {
              Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
            }
          })

          texte = 'Vous etes desormais abonne !'
          break
        case 'unfollow':
          requestFollow = await api.delete(`users/${VueCookies.get('idUser')}/follow/${this.idUser}`, {
            headers: {
              Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
            }
          })
          texte = 'Vous vous etes desabonnez !'
          break
      }
      await this.forNotification(requestFollow, texte)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
    },
    async verificationFollow() {
      if (
        VueCookies.get('tokenUser') &&
        VueCookies.get('idUser') &&
        parseInt(VueCookies.get('idUser')) !== this.idUser
      ) {
        let verification = false
        let data = await api.get(`users/${VueCookies.get('idUser')}/follows`)
        let userFollow = data.data
        userFollow.member.forEach((user) => {
          if (user.id === this.idUser) {
            verification = true
          }
        })
        this.userConnectedFollow = verification
      }
    },
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  async mounted() {
    await this.verificationFollow()
  },
}
</script>

<template>
  <Notification
    v-if="this.valueNotification != null && this.textNotification != null"
    :value="valueNotification"
    :text="textNotification"
  />
  <div class="col-12 my-2"
       v-if="this.userConnectedFollow && parseInt(VueCookies.get('idUser')) !== this.idUser">
    <button type="button" @click="systemFollow('unfollow')" class="btn btn-danger">
      Se désabonner
    </button>
  </div>
  <div class="col-12"
       v-else-if="!this.userConnectedFollow && parseInt(VueCookies.get('idUser')) !== this.idUser">
    <button type="button" @click="systemFollow('follow')" class="btn btn-success">
      S'abonner
    </button>
  </div>
</template>

<style scoped></style>
