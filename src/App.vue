<template>
  <HeaderJudgement />
  <router-view />
  <FooterJudgement />
</template>

<script>
import FooterJudgement from '@/components/Footer.vue'
import HeaderJudgement from '@/components/header/HeaderJudgement.vue'

export default {
  name: 'App',
  components: { FooterJudgement, HeaderJudgement },
}
</script>

<style></style>
