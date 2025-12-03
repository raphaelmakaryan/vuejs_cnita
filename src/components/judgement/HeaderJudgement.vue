<script>
import VueCookies from "vue-cookies";

export default {
  name: "HeaderJudgement",
  computed: {
    VueCookies() {
      return VueCookies
    }
  }
}
</script>

<template>
  <header class="mb-5">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
          <router-link to="/judgement" class="navbar-brand">
            <img src="/logo.png" alt="Logo" width="50"
                 class="d-inline-block align-text-top">
          </router-link>
          <form class="d-flex w-25" role="search">
            <input class="form-control me-2 w-100" type="search" placeholder="Search"
                   aria-label="Search"/>
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/judgement" class="nav-link">Accueil Judgement</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">Accueil du site</router-link>
            </li>
            <li class="nav-item" v-if="!VueCookies.get('tokenUser') && !VueCookies.get('idUser')">
              <router-link to="/judgement/login" class="nav-link">Se connecter</router-link>
            </li>
            <li class="nav-item" v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')">
              <router-link to="/judgement/profil" class="nav-link">Profil</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>
