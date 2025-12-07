<template>
  <Header />
  <router-view />
  <FooterJudgement />
</template>

<script>
import Header from '@/components/header/HeaderJudgement.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import FooterJudgement from '@/components/Footer.vue'

export default {
  name: 'App',
  components: { FooterJudgement, Header },
  setup() {
    const router = useRouter()

    onMounted(() => {
      router.push('/')
    })
  },
}
</script>

<style></style>
