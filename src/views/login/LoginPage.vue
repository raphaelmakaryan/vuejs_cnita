<script>
import api from "@/assets/api.js"
import Notification from '@/components/Notification.vue'
import router from '@/router/index.js'

export default {
  name: 'LoginJudgement',
  components: {Notification},
  data() {
    return {
      valueNotification: null,
      textNotification: null,
      newBody: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    async login() {
      if (this.newBody.email && this.newBody.password) {
        let data = await api({
          url: '/auth',
          method: 'post',
          data: this.newBody
        })
        document.getElementById("buttonLogin").setAttribute("disabled", "disabled")
        await this.forNotification(data.data)
        await this.save(data.data)
      }
    },
    async save(data) {
      setTimeout(() => {
        this.$cookies.set('tokenUser', data.token, data.ttl)
        this.$cookies.set('idUser', data.user.id, data.ttl)
        window.dispatchEvent(new Event('auth-change'))
        router.push({name: 'ProfilJudgement'})
      }, 1000)
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous êtes connecté !'
      }
    },
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-1 text-start titleSeparation">Se connecter</p>
          <hr>
        </div>
      </div>
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
      <form method="post" @submit.prevent="login">
        <div class="row my-2">
          <div class="col-12">
            <label for="emailInput" class="form-label">Email address</label>
            <input
              type="email"
              class="form-control"
              id="emailInput"
              v-model="newBody.email"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>
        <div class="row my-2">
          <div class="col-12">
            <label for="passwordInput" class="form-label">Password</label>
            <input
              type="passwordInput"
              class="form-control"
              id="passwordInput"
              v-model="newBody.password"
              required
            />
          </div>
        </div>
        <div class="row my-4">
          <div class="col-12">
            <button type="submit" class="btn btn-primary w-100" id="buttonLogin">Se connecter</button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
