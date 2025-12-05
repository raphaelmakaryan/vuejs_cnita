<script>
import VueCookies from 'vue-cookies'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'

export default {
  name: 'UserSuscribe',
  props: {
    idUser: Number,
  },
  data() {
    return {
      userConnectedFollow: null,
    }
  },
  methods: {
    async systemFollow(type) {
      let requestFollow
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
          await this.status(requestFollow, "Vous l'avez suivis !")
          break
        case 'unfollow':
          alert('Vous vous etes desabonnez !')
          await JudgementAPI.mounted(
            'DELETE',
            `users/${VueCookies.get('idUser')}/follow/${this.valueIdUser}`,
            '',
            undefined,
            VueCookies.get('tokenUser'),
          )
          window.location.reload()
          break
      }
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
    async status(data, texte) {
      if (data !== null && data.status) {
        alert(data.detail)
      } else {
        alert(texte)
        window.location.reload()
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
