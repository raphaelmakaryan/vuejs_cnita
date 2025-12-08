<script>
import {toRaw} from 'vue'
import api from "@/assets/api.js"

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
    let data = await api({
      url: `people/${this.idCast}`,
      method: 'get',
    })
    this.cast = data.data
  },
}
</script>

<template>
  <section class="my-5" v-if="Object.keys(this.cast).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 fw-bold mt-3">INFORMATIONS DE L'ACTEUR</p>
          <hr/>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-12">
          <p class="fs-6">
            <span class="text-decoration-underline"> Nom de l'acteur : </span> {{ cast.fullName }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
