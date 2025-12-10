<script>
import draggable from "vuedraggable";
import {Container, Draggable} from "vue-dndrop";

export default {
  name: 'CollectionMovie',
  components: {draggable, Container, Draggable},
  data() {
    return {
      list: [],
      position: 0,
      chooseMovie: null,
      dragAnDropValue: "",
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
      return document.querySelectorAll(".cardInfos")[index].children[0].alt
    },
    onDrop(dropResult) {
      let changeValueUser = [dropResult.removedIndex, this.tidyingforDrag(dropResult.removedIndex)]
      let changeValueNotUser = [dropResult.addedIndex, this.tidyingforDrag(dropResult.addedIndex)]
      this.changePositionFront(changeValueUser, changeValueNotUser)
      this.changePositionRequest(changeValueUser, changeValueNotUser)
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
      //this.$emit('updateList', this.localListRequest)
    },
    changePositionFront(changeValueUser, changeValueNotUser) {
      console.log("Avant : ", this.localMovies.entries)
      let newFrontMovies = []
      for (let i = 0; i < this.localMovies.entries.length; i++) {
        if (this.localMovies.entries[i].movie.id === changeValueUser[1]) {
          let newPos = this.localMovies.entries[i].position = changeValueUser[0]
          newFrontMovies.push(newPos)
        } else if (this.localMovies.entries[i].movie.id === changeValueNotUser[1]) {
          let newPos = this.localMovies.entries[i].position = changeValueNotUser[0]
          newFrontMovies.push(newPos)
        } else {
          newFrontMovies.push(this.localMovies.entries[i])
        }
      }
      console.log("Apres : ", newFrontMovies)
      //this.$emit('updateList', this.localListRequest)
    },
    /*
  removeFromList(id) {
    this.oldList.entries.forEach((item) => {
      if (id === item.id) {
        this.oldList.entries.splice(item.position - 1, 1)
        this.oldListRequest.splice(item.position - 1, 1)
        this.$emit('updateList', this.newListRequest)
      }
    })

  },
  dragAndDrop(evt) {
    /*
    let changeValueUser = [evt.clone, evt.newIndex]
    let changeValueNotUser = [evt.item, evt.oldIndex]
    this.changePosition(changeValueUser, changeValueNotUser)

  }
     */
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.localMovies.entries).length > 0">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FILMS</p>
          <hr/>
        </div>
      </div>
      <div class="row my-2 d-flex flex-column flex-md-row align-items-center"
           style="overflow-x: auto">
        <Container @drop="onDrop" orientation="horizontal" behaviour="contain">
          <Draggable v-for="movie in this.localMovies.entries" class="
                     col-12 col-sm-12 col-md-6 col-lg-4 my-2 d-flex flex-column align-items-center">
            <div class="draggable-item-horizontal">
              <div class="card cardInfos my-2" style="width: 18rem">
                <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.id"/>
                <div class="card-body">
                  <router-link
                    :to="{ path: '/movie/' + movie.movie.id }"
                    class="card-title text-decoration-underline fs-5"
                  >
                    {{ movie.movie.title }}
                  </router-link>
                  <div class="d-flex mt-3 mb-1 flex-column align-items-center">
                    <button type="button" @click="removeFromList(movie.id)"
                            class="btn btn-danger mx-1">
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
