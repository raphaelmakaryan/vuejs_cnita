<script>
export default {
  name: "VerificationConnected",
  methods: {
    existed() {
      return this.$cookies.isKey("tokenUser") && this.$cookies.get("tokenUser");
    },
    timeExceeded() {
    }
  },
  async mounted(canCome) {
    if (!this.existed() || this.existed() && !canCome) {
      this.$router.push('HomeJudgement')
    }
  }
}
</script>

<template>

</template>

<style scoped>

</style>
