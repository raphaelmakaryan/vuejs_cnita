<script>
import JudgementAPI from '@/components/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'CreateCollectionJudgement',
  data() {
    return {
      newBody: {
        user: '/api/users/' + VueCookies.get('idUser'),
        title: this.newName,
        entries: [],
      },
      newName: null,
    }
  },
  methods: {
    async status(data) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert('Vous avec crée une nouvelle liste !')
        window.location.reload()
      }
    },
    async createCollection() {
      await this.status(
        await JudgementAPI.mounted(
          'POST',
          `custom_lists`,
          this.newBody,
          undefined,
          VueCookies.get('tokenUser'),
        ),
      )
    },
  },
}
</script>

<template>
  <form @submit.prevent="createCollection">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">CREER UNE COLLECTION</p>
            <hr />
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
