<script>
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'

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
    this.director = toRaw(
      await JudgementAPI.mounted('GET', `people/${this.idDirector}`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.director).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">INFORMATIONS DU DIRECTEUR</p>
          <hr />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <p class="fs-6">
            <span class="text-decoration-underline"> Nom du directeur : </span>
            {{ director.fullName }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
