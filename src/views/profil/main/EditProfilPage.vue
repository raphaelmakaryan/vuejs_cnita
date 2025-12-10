<script>
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'EditProfilJudgement',
  components: {Notification},
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
      let data = await api.get(`users/${VueCookies.get('idUser')}`)
      this.user = data.data
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
      let data = await api.patch(`users/${VueCookies.get('idUser')}`, {
        data: this.newBody,
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      document.getElementById("buttonProfil").setAttribute("disabled", "disabled")
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
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
          <hr/>
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
            <button type="submit" class="btn btn-primary w-100" id="buttonProfil">Mettre a jour
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
