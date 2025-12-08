<script>
import draggable from "vuedraggable";

export default {
  name: 'CollectionMovie',
  components: {draggable},
  data() {
    return {
      list: [],
      position: 0,
      chooseMovie: null,
      dragAnDropValue: "",
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
  methods: {
    removeFromList(id) {
      this.oldList.entries.forEach((item) => {
        if (id === item.id) {
          this.oldList.entries.splice(item.position - 1, 1)
          this.oldListRequest.splice(item.position - 1, 1)
          this.$emit('updateList', this.oldListRequest)
        }
      })
    },
    changePosition(changeValueUser, changeValueNotUser) {
      this.oldListRequest.forEach((item) => {
        if (item.movie === `/api/movies/${changeValueNotUser[0].value}`) {
          item.movie = `/api/movies/${changeValueUser[0].value}`
        } else if (item.movie === `/api/movies/${changeValueUser[0].value}`) {
          item.movie = `/api/movies/${changeValueNotUser[0].value}`
        }
      })
      this.$emit('updateList', this.oldListRequest)
    },
    dragAndDrop(evt) {
      let changeValueUser = [evt.clone, evt.newIndex]
      let changeValueNotUser = [evt.item, evt.oldIndex]
      this.changePosition(changeValueUser, changeValueNotUser)
    }
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(oldList.entries).length > 0">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FILMS</p>
          <hr/>
        </div>
      </div>
      <div class="row my-2 d-flex flex-column flex-md-row align-items-center">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="movie in this.oldList.entries">
          <div class="card my-2" style="width: 18rem">
            <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.title"/>
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
      </div>
    </div>
  </section>

  <section class="mt-2" v-if="this.oldList.entries.length >= 2">
    <div class="container">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">POSITIONS DES FILMS</p>
          <hr/>
        </div>
      </div>
      <div class="row my-2">
        <draggable v-model="this.oldList.entries" tag="ul" :class="{
          'list-group': true
        }" :itemKey="this.dragAnDropValue" @update="dragAndDrop">
          <template #item="{ element: films }">
            <li :value="films.movie.id" class="list-group-item">{{ films.movie.title }}
            </li>
          </template>
        </draggable>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
