<script>
import { Container, Draggable } from 'vue-dndrop'

export default {
  name: 'CollectionMovie',
  components: { Container, Draggable },
  data() {
    return {
      list: [],
      position: 0,
      chooseMovie: null,
      dragAnDropValue: '',
      localListRequest: [],
      localMovies: [],
    }
  },
  props: {
    oldListRequest: {
      type: Object,
      required: true,
    },
    oldList: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.localMovies = this.oldList
    this.localListRequest = JSON.parse(JSON.stringify(this.oldListRequest))
  },
  methods: {
    tidyingforDrag(index) {
      return document.querySelectorAll('.cardInfos')[index].children[0].alt
    },
    async onDrop(dropResult) {
      if (dropResult.removedIndex !== 0 && dropResult.addedIndex !== 0) {
        let changeValueUser = [
          await dropResult.removedIndex,
          parseInt(this.tidyingforDrag(await dropResult.removedIndex)),
        ]
        let changeValueNotUser = [
          await dropResult.addedIndex,
          parseInt(this.tidyingforDrag(await dropResult.addedIndex)),
        ]
        this.changePositionFront(changeValueUser, changeValueNotUser)
        this.changePositionRequest(changeValueUser, changeValueNotUser)
      }
    },
    changePositionRequest(changeValueUser, changeValueNotUser) {
      this.localListRequest.forEach((item) => {
        let condition1 = item.movie === `/api/movies/${changeValueNotUser[1]}`
        let condition2 = item.movie === `/api/movies/${changeValueUser[1]}`
        if (condition1) {
          item.movie = `/api/movies/${changeValueUser[1]}`
        } else if (condition2) {
          item.movie = `/api/movies/${changeValueNotUser[1]}`
        }
      })
      this.$emit('updateList', this.localListRequest)
    },
    async getDataOnMovieForPositionFront(changeValueUser, changeValueNotUser) {
      let oldMovie = []
      let newMovie = []
      for (let i = 0; i < this.localMovies.entries.length; i++) {
        if (this.localMovies.entries[i].movie.id === changeValueUser[1]) {
          newMovie.push(i)
          newMovie.push(this.localMovies.entries[i])
        } else if (this.localMovies.entries[i].movie.id === changeValueNotUser[1]) {
          oldMovie.push(i)
          oldMovie.push(this.localMovies.entries[i])
        }
      }
      return [oldMovie, newMovie]
    },
    async changePositionFront(changeValueUser, changeValueNotUser) {
      let newFrontMovies = { entries: [] }
      let datas = await this.getDataOnMovieForPositionFront(changeValueUser, changeValueNotUser)
      for (let i = 0; i < this.localMovies.entries.length; i++) {
        if (i === datas[0][0]) {
          newFrontMovies.entries.push(datas[1][1])
        } else if (i === datas[1][0]) {
          newFrontMovies.entries.push(datas[0][1])
        } else {
          newFrontMovies.entries.push(this.localMovies.entries[i])
        }
      }
      this.localMovies = newFrontMovies
    },
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.localMovies.entries).length > 0">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FILMS</p>
          <hr />
        </div>
      </div>
      <div
        class="row my-2 d-flex flex-column flex-md-row align-items-center"
        style="overflow-x: auto"
      >
        <Container @drop="onDrop" orientation="horizontal" behaviour="contain">
          <Draggable
            v-for="movie in this.localMovies.entries"
            class="col-12 col-sm-12 col-md-6 col-lg-4 my-2 d-flex flex-column align-items-center"
          >
            <div class="draggable-item-horizontal">
              <div class="card cardInfos my-2" style="width: 18rem">
                <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.id" />
                <div class="card-body">
                  <router-link
                    :to="{ path: '/movie/' + movie.movie.id }"
                    class="card-title text-decoration-underline fs-5"
                  >
                    {{ movie.movie.title }}
                  </router-link>
                  <div class="d-flex mt-3 mb-1 flex-column align-items-center">
                    <button
                      type="button"
                      @click="removeFromList(movie.id)"
                      class="btn btn-danger mx-1"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Draggable>
        </Container>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dndrop-container.horizontal {
  display: flex;
}
</style>
