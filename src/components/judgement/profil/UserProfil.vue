<script>
import { format } from 'timeago.js'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'UserProfil',
  data() {
    return {
      user: [],
    }
  },
  methods: {
    format,
  },
  async mounted() {
    this.user = toRaw(
      await JudgementAPI.mounted('GET', `users/${VueCookies.get('idUser')}`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">PROFIL</p>
          <hr />
        </div>
      </div>
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-6">
            <span class="text-decoration-underline"> Nom : </span> {{ user.username }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-2">
          <router-link to="/profil/edit" class="btn btn-primary">
            Modifier votre profil
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
