<script>
import VueCookies from 'vue-cookies'
import SearchBarHeader from '@/components/header/SearchBarHeader.vue'

export default {
  name: 'HeaderJudgement',
  components: { SearchBarHeader },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  data() {
    return {
      isLogged: VueCookies.get('tokenUser') && VueCookies.get('idUser'),
    }
  },
  mounted() {
    window.addEventListener('auth-change', this.updateStatus)
  },
  beforeUnmount() {
    window.removeEventListener('auth-change', this.updateStatus)
  },
  methods: {
    updateStatus() {
      this.isLogged = VueCookies.get('tokenUser') && VueCookies.get('idUser')
    },
  },
}
</script>

<template>
  <header class="mb-5">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
          <router-link to="/" class="navbar-brand">
            <img src="/logoW.png" alt="Logo" width="50" class="d-inline-block align-text-top" />
          </router-link>
          <SearchBarHeader />
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link text-secondary fw-bold mx-1" activeClass="active">Accueil</router-link>
            </li>
            <li class="nav-item" v-if="!isLogged">
              <router-link to="/login" class="nav-link text-secondary fw-bold mx-1" activeClass="active"
                >Se connecter</router-link
              >
            </li>
            <li class="nav-item" v-if="isLogged">
              <router-link to="/profil" class="nav-link text-secondary fw-bold mx-1" activeClass="active"
                >Profil</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  background: var(--color-bg-secondary) !important;
  border-bottom: 1px solid var(--color-border) !important;
  backdrop-filter: blur(10px);
}

.nav-link {
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color:  #ffffff !important;
  background: var(--color-bg-tertiary) !important;
}

.nav-link.active {
  color: var(--color-yellow-primary) !important;
  background: rgba(212, 175, 55, 0.1);
}
</style>
