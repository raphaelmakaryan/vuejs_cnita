<script>
import api from "@/assets/api.js"

export default {
  name: 'SearchBarHeader',
  methods: {
    displayResult() {
      return document.getElementById('resultData')
    },
    searchBar() {
      if (this.filter != null && this.searchBarValue !== '') {
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
      let data = await api.get('/people', {
        params: {
          page: "1",
          itemsPerPage: "3",
          fullName: this.searchBarValue
        }
      })
      this.peoplesSearchBar = data.data
    },
    async getSearchBarMovies() {
      this.moviesSearchBar = []
      let data = await api.get('/movies', {
        params: {
          page: "1",
          itemsPerPage: "3",
          title: this.searchBarValue
        }
      })
      this.moviesSearchBar = data.data
    },
    async getSearchBarUsers() {
      this.userSearchBar = []
      let data = await api.get('/users', {
        params: {
          page: "1",
          itemsPerPage: "3",
          username: this.searchBarValue
        }
      })
      this.userSearchBar = data.data
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
      filter: "movies"
    }
  },
}
</script>

<template>
  <div class="d-flex flex-column position-relative search-wrapper w-100 m-1 p-1" role="search">
    <div class="d-flex justify-content-center">
      <div class="w-100">
        <div class="input-group">
          <div>
            <select class="form-select rounded-start border-end-0"
                    aria-label="Default select example"
                    v-model="this.filter">
              <option selected value="movies">Films</option>
              <option value="peoples">Personnalités</option>
              <option value="users">Utilisateurs</option>
            </select>
          </div>
          <input
            type="search"
            class="form-control border-start-0"
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
              <p class="fs-5 mx-1 text-decoration-underline m-0 colorSearch">PERSONNALITÉ</p>
              <hr class="w-100"/>
            </div>
            <ul v-if="this.peoplesSearchBar.totalItems > 0">
              <li v-for="people in this.peoplesSearchBar.member">
                <router-link :to="{ path: '/cast/' + people.id }" class="fs-6 m-2 colorSearch"
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
              <p class="fs-5 mx-1 text-decoration-underline m-0 colorSearch">FILMS</p>
              <hr class="w-100"/>
            </div>
            <div v-if="this.moviesSearchBar.totalItems > 0">
              <ul>
                <li v-for="movie in this.moviesSearchBar.member">
                  <router-link :to="{ path: '/movie/' + movie.id }" class="fs-6 m-2 colorSearch"
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
              <p class="fs-5 mx-1 text-decoration-underline m-0 colorSearch">UTILISATEURS</p>
              <hr class="w-100"/>
            </div>
            <div v-if="this.userSearchBar.totalItems > 0">
              <ul>
                <li v-for="user in this.userSearchBar.member">
                  <router-link :to="{ path: '/user/' + user.id }" class="fs-6 m-2 colorSearch"
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
  border: 1px solid var(--color-border);
  color: #ffffff !important;
  transition: all 0.3s ease;
}

#searchBar::placeholder {
  color: #6c757d !important;
}

#searchBar:focus {
  border-color: var(--color-yellow-primary) !important;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.form-select {
  background-color: var(--color-bg-primary) !important;
  border: 1px solid var(--color-border);
  color: white;
  border-radius: unset;
  --bs-form-select-bg-img: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='white' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/></svg>");
}

.form-select:focus {
  border-color: var(--color-yellow-primary) !important;
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.1);
}

.colorSearch {
  color: var(--color-yellow-primary) !important;
}
</style>
