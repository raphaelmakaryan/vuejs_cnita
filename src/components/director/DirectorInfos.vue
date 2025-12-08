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
    let data = await api({
      url: `people/${this.idDirector}`,
      method: 'get',
    })
    this.director = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.director).length >= 1">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6 d-flex avatar">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <div class="col-12 col-lg-6">
          <p class="title ms-1">{{ director.fullName }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avatar {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-elevated));
  border: 3px solid var(--color-yellow-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-yellow-primary);
  position: sticky;
  top: 100px;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-yellow-primary), var(--color-yellow-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
