<script>
import api from '@/assets/api.js'

export default {
  name: 'CastInfosJudgement',
  props: {
    idCast: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cast: [],
    }
  },
  async mounted() {
    let data = await api.get(`people/${this.idCast}`)
    this.cast = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.cast).length >= 1">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6 d-flex avatarIconsInfos">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <div class="col-12 col-lg-6">
          <p class="titleInfos ms-1">{{ cast.fullName }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
