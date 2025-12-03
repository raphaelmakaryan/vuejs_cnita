<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import VerificationConnected from "@/components/judgement/VerificationConnected.vue";


export default {
  name: "LoginJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      email: null,
      password: null,
    }
  },
  methods: {
    async login() {
      if (this.email && this.password) {
        let body = {
          "email": this.email,
          "password": this.password,
        }
        await this.status(await JudgementAPI.mounted("POST", `auth`, body));
      }
    },
    async status(data) {
      if (data.status) {
        alert(data.detail);
      } else {
        this.saveData(data);
      }
    },
    async saveData(data) {
      this.$cookies.set("tokenUser", data.token, data.ttl)
    },
    async verificationLogin(canCome) {
      await VerificationConnected().mounted(canCome);
    },
    debugCookie() {
      console.log(this.$cookies.get("tokenUser"));
    }
  },
  async mounted() {
    await this.verificationLogin(false);
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section class="mt-5">
    <div class="container border rounded">
      <div class="row my-2">
        <div class="col-12">
          <p class="fs-1 text-center">Se connecter</p>
        </div>
      </div>
      <form method="post" @submit.prevent="login">
        <div class="row my-2">
          <div class="col-12">
            <label for="emailInput" class="form-label">Email address</label>
            <input type="email" class="form-control" id="emailInput" v-model="email"
                   placeholder="name@example.com" required>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-12">
            <label for="passwordInput" class="form-label">Password</label>
            <input type="passwordInput" class="form-control" id="passwordInput"
                   v-model="password"
                   required>
          </div>
        </div>
        <div class="row my-4">
          <div class="col-12">
            <button type="submit" class="btn btn-primary w-100">Se connecter</button>
          </div>
        </div>
      </form>
    </div>
  </section>


</template>

<style scoped>

</style>
