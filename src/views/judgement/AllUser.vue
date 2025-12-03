<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import {format} from "timeago.js";
import {toRaw} from "vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";

export default {
  name: "AllUserJudgement",
  components: {HeaderJudgement},
  data() {
    return {
      users: []
    }
  },
  methods: {
    format,
    async allUsers() {
      this.users = toRaw(await JudgementAPI.mounted("GET", `users`, "", ""))
    }
  },
  async mounted() {
    await this.allUsers();
  }
}
</script>

<template>
  <HeaderJudgement/>

  <div class="d-flex flex-column">
    <router-link :to="{path: '/judgement/user/' + user.id}" class="text-decoration-none my-2 fs-6"
                 v-for="user in this.users.member">
      {{ user.username }}
    </router-link>
  </div>


</template>

<style scoped>

</style>
