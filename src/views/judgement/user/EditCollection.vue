<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";

export default {
  name: "EditCollectionJudgement",
  data() {
    return {
      valueIdList: this.$route.params.id,
      oldList: [],
      newList: [],
      listRequest: [],
      newName: null
    }
  },
  methods: {
    async getList() {
      this.oldList = toRaw(await JudgementAPI.mounted("GET", `custom_lists/${this.valueIdList}`, "", undefined, ""))
      this.newList = this.oldList
    },
    async status(data) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert("Vous avec modifié votre collection !");
        window.location.reload();
      }
    },
    async updateCollection() {
      let title
      switch (this.newName) {
        case null:
          title = this.oldList.title
          break
        default:
          title = this.newName
          break
      }
      let body =
        {
          "title": title,
          "entries": this.listRequest
        }
      await this.status(await JudgementAPI.mounted("PATCH", `custom_lists/${this.oldList.id}`, body, "application/merge-patch+json", VueCookies.get('tokenUser')));
    },
    removeFromList(id) {
      this.newList.entries.forEach((item) => {
        if (id === item.id) {
          this.newList.entries.splice(item.position - 1, 1);
          this.listRequest.splice(item.position - 1, 1);
        }
      })
      console.log(this.listRequest)
    },
    setupListRequest() {
      this.oldList.entries.forEach((element, index) => {
        this.listRequest.push(
          {
            "position": index + 1,
            "movie": `/api/movies/${element.movie.id}`
          },
        );
      });
    }
  },
  components: {HeaderJudgement},
  async mounted() {
    await this.getList();
    this.setupListRequest()
  }
}
</script>

<template>
  <HeaderJudgement/>
  <form @submit.prevent="updateCollection">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              MODIFIER LA COLLECTION : <span class="fw-bold fst-italic">{{ oldList.title }}</span>
            </p>
            <hr>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newName" class="form-label">Nouveau nom de la collection</label>
            <input type="text" class="form-control" id="newName" v-model="newName"
                   minlength="3" required :placeholder="this.oldList.title"
            >
          </div>
        </div>
      </div>
    </section>

    <section class="my-5" v-if="Object.keys(this.newList.entries).length > 0">
      <div class="container border rounded">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 fw-bold mt-3">
              FILMS
            </p>
            <hr>
          </div>
        </div>
        <div class="row mt-2 d-flex flex-column flex-md-row align-items-center">
          <div class="col-12 col-sm-12 col-md-4 col-lg-4" v-for="movie in this.newList.entries">
            <div class="card my-2" style="width: 18rem;">
              <img :src="movie.movie.poster" class="card-img-top" :alt="movie.movie.title">
              <div class="card-body">
                <router-link :to="{path: '/judgement/movie/' + movie.id}"
                             class="card-title text-decoration-underline fs-5">
                  {{ movie.movie.title }}
                </router-link>
                <div class="d-flex mt-3 mb-1 flex-column align-items-center">
                  <button type="button"
                          @click="removeFromList(movie.id)"
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


    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Mettre a jour</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons";
</style>

