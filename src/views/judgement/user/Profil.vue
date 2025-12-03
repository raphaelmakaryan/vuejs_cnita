<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VueCookies from "vue-cookies";

export default {
  name: "ProfilJudgement",
  data() {
    return {
      user: []
    }
  },
  methods: {
    async getUser() {
      this.user = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}`, "", ""))
    },
  },
  components: {HeaderJudgement},
  async mounted() {
    await this.getUser();
    console.log(this.user);
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section class="mt-5">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">
            PROFIL
          </p>
          <hr>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12 my-2">
          <p class="fs-6"><span class="text-decoration-underline">
              Nom :
            </span>
            {{ user.username }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
