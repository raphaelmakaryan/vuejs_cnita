<script>
export default {
  name: 'CollectionMovie',
  data() {
    return {
      list: [],
      listRequest: [],
      newName: null,
    }
  },
  props: {
    backupList: Object,
  },
  async mounted() {
    this.list = await this.backupList
    console.log(this.list)
    /*
    console.log(this.backupList)
    if (this.list.entries.length > 0) {
      this.list.entries.forEach((element, index) => {
        this.listRequest.push({
          position: index + 1,
          movie: `/api/movies/${element.movie.id}`,
        })
      })
    }

     */
  },
  methods: {
    async status(data) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert('Vous avec modifié votre collection !')
        window.location.reload()
      }
    },
    removeFromList(id) {
      this.list.entries.forEach((item) => {
        if (id === item.id) {
          this.list.entries.splice(item.position - 1, 1)
          this.listRequest.splice(item.position - 1, 1)
        }
      })
    },
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.list.entries).length > 0">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">FILMS</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2 d-flex flex-column flex-md-row align-items-center">
        <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="movie in this.list.entries">
          <div class="card my-2" style="width: 18rem">
            <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.title" />
            <div class="card-body">
              <router-link
                :to="{ path: '/movie/' + movie.id }"
                class="card-title text-decoration-underline fs-5"
              >
                {{ movie.movie.title }}
              </router-link>
              <div class="d-flex mt-3 mb-1 flex-column align-items-center">
                <button
                  type="button"
                  @click="removeFromList(movie.id)"
                  class="btn btn-danger mx-1"
                  @input="$emit('updateList', listRequest)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
