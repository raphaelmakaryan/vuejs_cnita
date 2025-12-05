<template>
  <Header />
  <router-view />
</template>

<script>
import Header from '@/components/judgement/HeaderJudgement.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  components: { Header },
  setup() {
    const router = useRouter()

    onMounted(() => {
      router.push('/')
    })
  },
}
</script>

<style></style>
