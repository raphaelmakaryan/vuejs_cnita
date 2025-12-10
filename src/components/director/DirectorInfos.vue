<script>
import api from '@/assets/api.js'

export default {
  name: 'DirectorInfosJudgement',
  props: {
    idDirector: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      director: [],
    }
  },
  async mounted() {
    let data = await api.get(`people/${this.idDirector}`)
    this.director = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.director).length >= 1">
    <div class="container">
      <div class="row flex-lg-row d-flex flex-column align-items-center">
        <div class="col-12 col-lg-6 my-2 d-flex avatarIconsInfos">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <div class="col-12 col-lg-6 my-2 d-flex flex-lg-row flex-column align-items-center">
          <p class="titleInfos ms-1">{{ director.fullName }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
