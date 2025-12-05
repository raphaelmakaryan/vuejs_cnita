<script>
import VueCookies from "vue-cookies";
import {toRaw} from "vue";
import JudgementApi from "@/components/API/JudgementAPI.vue";

export default {
  name: "HeaderJudgement",
  computed: {
    VueCookies() {
      return VueCookies
    }
  },
  methods: {
    displayResult() {
      return document.getElementById("resultData");
    },
    searchBar() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        let resultData = this.displayResult()
        this.showCategorie(resultData)
      }, 300);
    },
    showCategorie(div) {
      this.optionBar(div, "hide")
      this.getSearchBarPeople();
      this.getSearchBarMovies();
      this.getSearchBarUsers()
      this.optionBar(div, "show")
    },
    optionBar(div, type) {
      switch (type) {
        case "show":
          div.style.display = "flex";
          break;
        case "hide":
          div.style.display = "none";
          break;
      }
    },
    async getSearchBarPeople() {
      this.peoplesSearchBar = []
      this.peoplesSearchBar = toRaw(await JudgementApi.mounted("GET", "people?page=1&itemsPerPage=3&fullName%5B%5D=" + this.searchBarValue, "", undefined, ""))
    },
    async getSearchBarMovies() {
      this.moviesSearchBar = []
      this.moviesSearchBar = toRaw(await JudgementApi.mounted("GET", "movies?page=1&itemsPerPage=3&title%5B%5D=" + this.searchBarValue, "", undefined, ""))
    },
    async getSearchBarUsers() {
      this.userSearchBar = []
      this.userSearchBar = toRaw(await JudgementApi.mounted("GET", "users?page=1&itemsPerPage=3&username%5B%5D=" + this.searchBarValue, "", undefined, ""))
      console.log(this.userSearchBar)
    },
  },
  data() {
    return {
      debounceTimer: null,
      searchBarValue: null,
      peoplesSearchBar: [],
      moviesSearchBar: [],
      userSearchBar: [],
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
          <router-link to="/" class="navbar-brand">
            <img src="/logo.png" alt="Logo" width="50"
                 class="d-inline-block align-text-top">
          </router-link>
          <div class="d-flex w-50 flex-column" role="search">
            <input class="form-control me-2 w-100" type="search" placeholder="Search"
                   aria-label="Search" v-model="searchBarValue" @keyup="searchBar"/>
            <div id="resultData" class="z-3 border rounded rounded-top-0 flex-column">
              <div v-if="Object.keys(this.peoplesSearchBar).length > 0" id="resultPeople"
                   class="my-2 d-flex flex-column w-100">
                <div class="my-2">
                  <p class="fs-5 mx-1 text-decoration-underline m-0">PERSONNALITÉ</p>
                  <hr class="w-100">
                </div>
                <div v-if="this.peoplesSearchBar.totalItems > 0">
                  <ul>
                    <li v-for="people in this.peoplesSearchBar.member">
                      <router-link :to="{path: '/cast/' + people.id}"
                                   class="fs-6 m-2">{{ people.fullName }}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p class="fs-6 mx-1 fw-bold">Aucune personnalité.</p>
                </div>
              </div>
              <div v-if="Object.keys(this.moviesSearchBar).length > 0" id="resultMovies"
                   class="my-2 d-flex flex-column w-100">
                <div class="my-2">
                  <p class="fs-5 mx-1 text-decoration-underline m-0">FILMS</p>
                  <hr class="w-100">
                </div>
                <div v-if="this.moviesSearchBar.totalItems > 0">
                  <ul>
                    <li v-for="movie in this.moviesSearchBar.member">
                      <router-link :to="{path: '/movie/' + movie.id}"
                                   class="fs-6 m-2">{{ movie.title }}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p class="fs-6 mx-1 fw-bold">Aucun films.</p>
                </div>
              </div>
              <div v-if="Object.keys(this.userSearchBar).length > 0" id="resultUsers"
                   class="my-2 d-flex flex-column w-100">
                <div class="my-2">
                  <p class="fs-5 mx-1 text-decoration-underline m-0">UTILISATEURS</p>
                  <hr class="w-100">
                </div>
                <div v-if="this.userSearchBar.totalItems > 0">
                  <ul>
                    <li v-for="user in this.userSearchBar.member">
                      <router-link :to="{path: '/user/' + user.id}"
                                   class="fs-6 m-2">{{ user.username }}
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p class="fs-6 mx-1 fw-bold">Aucun utilisateur.</p>
                </div>
              </div>
            </div>
          </div>
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Accueil</router-link>
            </li>
            <li class="nav-item" v-if="!VueCookies.get('tokenUser') && !VueCookies.get('idUser')">
              <router-link to="/login" class="nav-link">Se connecter</router-link>
            </li>
            <li class="nav-item" v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')">
              <router-link to="/profil" class="nav-link">Profil</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

</template>

<style scoped>
#resultData {
  background-color: white;
  display: none;
}
</style>
