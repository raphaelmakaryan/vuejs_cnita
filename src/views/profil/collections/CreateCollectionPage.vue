<script>
import api from "@/assets/api.js"
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'CreateCollectionJudgement',
  components: {Notification},
  data() {
    return {
      newBody: {
        user: '/api/users/' + VueCookies.get('idUser'),
        title: this.newName,
        entries: [],
      },
      newName: null,
      valueNotification: null,
      textNotification: null,
    }
  },
  methods: {
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avec crée une nouvelle liste !'
      }
    },
    async createCollection() {
      let data = await api.post('/custom_lists', {
        data: this.newBody,
        headers: {
          "Authorization": `Bearer ${VueCookies.get('tokenUser')}`
        }
      })
      await this.forNotification(data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
    },
  },
}
</script>

<template>
  <form @submit.prevent="createCollection">
    <section class="my-5">
      <div class="container">
        <Notification
          v-if="this.valueNotification != null && this.textNotification != null"
          :value="valueNotification"
          :text="textNotification"
        />
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">CREER UNE COLLECTION</p>
            <hr/>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newName" class="form-label">Nom de la collection</label>
            <input
              type="text"
              class="form-control"
              id="newName"
              v-model="this.newBody.title"
              minlength="3"
              required
            />
          </div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Creer</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped></style>
