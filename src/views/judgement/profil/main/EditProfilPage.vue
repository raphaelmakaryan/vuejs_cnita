<script>
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'EditProfilJudgement',
  data() {
    return {
      user: [],
      newBody: {
        username: null,
      },
    }
  },
  methods: {
    async getUser() {
      this.user = toRaw(
        await JudgementAPI.mounted('GET', `users/${VueCookies.get('idUser')}`, '', undefined, ''),
      )
    },
    async status(data) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert('Vous avec modifié votre pseudo !')
        window.location.reload()
      }
    },
    async updateProfil() {
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `users/${VueCookies.get('idUser')}`,
          this.newBody.username,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
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
