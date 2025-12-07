<script>
import { toRaw } from 'vue'
import JudgementApi from '@/components/JudgementAPI.vue'

export default {
  name: 'SearchBarHeader',
  methods: {
    displayResult() {
      return document.getElementById('resultData')
    },
    chooseFilter(value) {
      this.filter = value
    },
    searchBar() {
      if (this.filter != null) {
        clearTimeout(this.debounceTimer)
        this.debounceTimer = setTimeout(() => {
          this.chooseCategorie(this.displayResult())
        }, 300)
      }
    },
    chooseCategorie(div) {
      if (this.searchBarValue.length >= 2) {
        this.optionBar(div, 'hide')
        switch (this.filter) {
          case 'movies':
            this.getSearchBarMovies()
            break
          case 'peoples':
            this.getSearchBarPeople()
            break
          case 'users':
            this.getSearchBarUsers()
            break
        }
        this.resetData(this.filter)
        this.optionBar(div, 'show')
      } else {
        this.resetData(null)
        this.optionBar(div, 'hide')
      }
    },
    optionBar(div, type) {
      switch (type) {
        case 'show':
          div.style.display = 'flex'
          break
        case 'hide':
          div.style.display = 'none'
          break
      }
    },
    async getSearchBarPeople() {
      this.peoplesSearchBar = []
      this.peoplesSearchBar = toRaw(
        await JudgementApi.mounted(
          'GET',
          'people?page=1&itemsPerPage=3&fullName%5B%5D=' + this.searchBarValue,
          '',
          undefined,
          '',
        ),
      )
    },
    async getSearchBarMovies() {
      this.moviesSearchBar = []
      this.moviesSearchBar = toRaw(
        await JudgementApi.mounted(
          'GET',
          'movies?page=1&itemsPerPage=3&title%5B%5D=' + this.searchBarValue,
          '',
          undefined,
          '',
        ),
      )
    },
    async getSearchBarUsers() {
      this.userSearchBar = []
      this.userSearchBar = toRaw(
        await JudgementApi.mounted(
          'GET',
          'users?page=1&itemsPerPage=3&username%5B%5D=' + this.searchBarValue,
          '',
          undefined,
          '',
        ),
      )
    },
    resetData(notValue) {
      switch (notValue) {
        case 'movies':
          this.peoplesSearchBar = []
          this.userSearchBar = []
          break
        case 'peoples':
          this.moviesSearchBar = []
          this.userSearchBar = []
          break
        case 'users':
          this.moviesSearchBar = []
          this.peoplesSearchBar = []
          break
        default:
          this.moviesSearchBar = []
          this.peoplesSearchBar = []
          this.userSearchBar = []
          break
      }
    },
  },
  data() {
    return {
      debounceTimer: null,
      searchBarValue: null,
      peoplesSearchBar: [],
      moviesSearchBar: [],
      userSearchBar: [],
      filter: null,
    }
  },
}
</script>

<template>
  <div class="d-flex w-50 flex-column position-relative search-wrapper" role="search">
    <div>
      <div class="input-group">
        <button
          class="btn btn-outline-secondary dropdown-toggle text-white"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filtre
        </button>
        <ul class="dropdown-menu" style="z-index: 3000">
          <li><a class="dropdown-item" href="#" @click="this.chooseFilter('movies')">Films</a></li>
          <li>
            <a class="dropdown-item" href="#" @click="this.chooseFilter('peoples')">Personnalité</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="this.chooseFilter('users')">Utilisateur</a>
          </li>
        </ul>
        <input
          type="search"
          class="form-control"
          placeholder="Rechercher un film, un acteur, un utilisateur..."
          id="searchBar"
          aria-label="Search"
          v-model="searchBarValue"
          @keyup="searchBar"
        />
      </div>
      <div id="resultData" class="border rounded rounded-top-0 flex-column w-100">
        <div
          v-if="Object.keys(this.peoplesSearchBar).length > 0"
          id="resultPeople"
          class="my-2 d-flex flex-column w-100"
        >
          <div class="my-2">
            <p class="fs-5 mx-1 text-decoration-underline m-0">PERSONNALITÉ</p>
            <hr class="w-100" />
          </div>
          <ul v-if="this.peoplesSearchBar.totalItems > 0">
            <li v-for="people in this.peoplesSearchBar.member">
              <router-link :to="{ path: '/cast/' + people.id }" class="fs-6 m-2"
                >{{ people.fullName }}
              </router-link>
            </li>
          </ul>
          <div v-else>
            <p class="fs-6 mx-1 fw-bold">Aucune personnalité.</p>
          </div>
        </div>
        <div
          v-if="Object.keys(this.moviesSearchBar).length > 0"
          id="resultMovies"
          class="my-2 d-flex flex-column w-100"
        >
          <div class="my-2">
            <p class="fs-5 mx-1 text-decoration-underline m-0">FILMS</p>
            <hr class="w-100" />
          </div>
          <div v-if="this.moviesSearchBar.totalItems > 0">
            <ul>
              <li v-for="movie in this.moviesSearchBar.member">
                <router-link :to="{ path: '/movie/' + movie.id }" class="fs-6 m-2"
                  >{{ movie.title }}
                </router-link>
              </li>
            </ul>
          </div>
          <div v-else>
            <p class="fs-6 mx-1 fw-bold">Aucun films.</p>
          </div>
        </div>
        <div
          v-if="Object.keys(this.userSearchBar).length > 0"
          id="resultUsers"
          class="my-2 d-flex flex-column w-100"
        >
          <div class="my-2">
            <p class="fs-5 mx-1 text-decoration-underline m-0">UTILISATEURS</p>
            <hr class="w-100" />
          </div>
          <div v-if="this.userSearchBar.totalItems > 0">
            <ul>
              <li v-for="user in this.userSearchBar.member">
                <router-link :to="{ path: '/user/' + user.id }" class="fs-6 m-2"
                  >{{ user.username }}
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
  </div>
</template>

<style scoped>
.search-wrapper {
  position: relative;
  overflow: visible !important;
}

#resultData {
  background-color: var(--color-bg-tertiary);
  display: none;
  position: absolute;
  z-index: 2000;
  max-height: 320px;
  overflow-y: auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

#searchBar {
  background: var(--color-bg-primary) !important;
  border: 1px solid var(--color-border) !important;
  color: var(--color-text-primary) !important;
  transition: all 0.3s ease;
}

#searchBar::placeholder {
  color: var(--color-text-secondary) !important;
}

#searchBar:focus {
  border-color: var(--color-accent-primary) !important;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.dropdown-menu {
  background-color: var(--color-bg-primary) !important;
  border: 1px solid var(--color-accent-primary) !important;
}

.dropdown-menu > li > a:hover {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent) !important;
}

.dropdown-menu > li > a {
  color: white;
}
</style>
