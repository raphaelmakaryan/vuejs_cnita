<script>
import VueCookies from 'vue-cookies'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import Notification from '@/components/Notification.vue'
import router from '@/router/index.js'

export default {
  name: 'UserSuscribe',
  components: { Notification },
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
          requestFollow = toRaw(
            await JudgementAPI.mounted(
              'POST',
              `users/${VueCookies.get('idUser')}/follow/${this.valueIdUser}`,
              '',
              undefined,
              VueCookies.get('tokenUser'),
            ),
          )
          texte = 'Vous etes desormais abonne !'
          break
        case 'unfollow':
          requestFollow = await JudgementAPI.mounted(
            'DELETE',
            `users/${VueCookies.get('idUser')}/follow/${this.valueIdUser}`,
            '',
            undefined,
            VueCookies.get('tokenUser'),
          )
          texte = 'Vous vous etes desabonnez !'
          break
      }
      await this.forNotification(requestFollow, texte)
      setTimeout(() => {
        router.push({ name: 'ProfilJudgement' })
      }, 2000)
    },
    async verificationFollow() {
      if (
        VueCookies.get('tokenUser') &&
        VueCookies.get('idUser') &&
        parseInt(VueCookies.get('idUser')) !== this.idUser
      ) {
        let verification = false
        let userFollow = toRaw(
          await JudgementAPI.mounted(
            'GET',
            `users/${VueCookies.get('idUser')}/follows`,
            '',
            undefined,
            '',
          ),
        )
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
  <section
    class="my-5"
    v-if="this.userConnectedFollow != null && parseInt(VueCookies.get('idUser')) !== this.idUser"
  >
    <div class="container">
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
      <div class="row">
        <div class="col-12" v-if="this.userConnectedFollow">
          <button type="button" @click="systemFollow('unfollow')" class="btn btn-danger">
            Se désabonner
          </button>
        </div>
        <div class="col-12" v-else-if="!this.userConnectedFollow">
          <button type="button" @click="systemFollow('follow')" class="btn btn-success">
            S'abonner
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
