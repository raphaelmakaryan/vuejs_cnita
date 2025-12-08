<script>
import { toRaw } from 'vue'
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'EditProfilJudgement',
  components: { Notification },
  data() {
    return {
      user: [],
      newBody: {
        username: null,
      },
      valueNotification: null,
      textNotification: null,
    }
  },
  methods: {
    async getUser() {
      this.user = toRaw(
        await api('GET', `users/${VueCookies.get('idUser')}`, '', undefined, ''),
      )
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avec modifié votre pseudo !'
      }
    },
    async updateProfil() {
      await this.forNotification(
        await api(
          'PATCH',
          `users/${VueCookies.get('idUser')}`,
          this.newBody,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
        setTimeout(() => {
          router.push({ name: 'ProfilJudgement' })
        }, 2000),
      )
    },
  },
  async mounted() {
    await this.getUser()
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container border rounded">
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">MODIFIER SON PROFIL</p>
          <hr />
        </div>
      </div>
      <form @submit.prevent="updateProfil">
        <div class="row my-2">
          <div class="col-12">
            <label for="newName" class="form-label">Nouveau nom</label>
            <input
              type="text"
              class="form-control"
              id="newName"
              v-model="newBody.username"
              :placeholder="user.username"
              minlength="3"
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Mettre a jour</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
