<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";

export default {
  name: "CreateCollectionJudgement",
  data() {
    return {
      newName: null
    }
  },
  methods: {
    async status(data) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert("Vous avec crée une nouvelle liste !");
        window.location.reload();
      }
    },
    async createCollection() {
      let body =
        {
          "user": "/api/users/" + VueCookies.get('idUser'),
          "title": this.newName,
          "entries": []
        }
      await this.status(await JudgementAPI.mounted("POST", `custom_lists`, body, undefined, VueCookies.get('tokenUser')));
    },
  },
  components: {HeaderJudgement}
}
</script>

<template>
  <HeaderJudgement/>
  <form @submit.prevent="createCollection">
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <p class="fs-2 mt-3">
              CREER UNE COLLECTION
            </p>
            <hr>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-12">
            <label for="newName" class="form-label">Nom de la collection</label>
            <input type="text" class="form-control" id="newName" v-model="newName"
                   minlength="3" required
            >
          </div>
        </div>
      </div>
    </section>

    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Creer</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped>
@import "bootstrap-icons/font/bootstrap-icons";
</style>

