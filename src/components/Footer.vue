<script>
import VueCookies from 'vue-cookies'

export default {
  name: 'FooterJudgement',
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
}
</script>

<template>
  <footer class="mt-5 p-5 mt-2">
    <section class="container">
      <div class="row">
        <div class="col-12 col-lg-6 d-flex flex-column">
          <p class="fs-6 text-white">© 2025 Judgement - Votre plateforme de critiques de films</p>
        </div>
        <div class="col-12 col-lg-6 d-flex flex-row justify-content-end">
          <router-link to="/" class="footer-link text-secondary mx-1">Accueil</router-link>
          <router-link
            to="/login"
            v-if="!VueCookies.get('tokenUser') && !VueCookies.get('idUser')"
            class="footer-link text-secondary mx-1"
            >Se connecter</router-link
          >
          <router-link
            to="/profil"
            v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"
            class="footer-link text-secondary mx-1"
            >Profil</router-link
          >
        </div>
      </div>
    </section>
  </footer>
</template>

<style scoped>
.footer-link {
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--color-yellow-primary);
}

footer {
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
}
</style>
