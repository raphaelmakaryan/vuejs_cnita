<script>
import VueCookies from 'vue-cookies'
import JudgementAPI from '@/components/JudgementAPI.vue'
import { toRaw } from 'vue'

export default {
  name: 'MovieConnectedCollectionJudgement',
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  props: {
    idMovie: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      collections: [],
      collectionsSelect: [],
      chooseAddCollection: null,
    }
  },
  methods: {
    async existedCollection() {
      let backupCollectionId = []
      this.collections.member.forEach((collection) => {
        if (collection.entries.length === 0) {
          this.collectionsSelect.push({
            id: collection.id,
            name: collection.title,
          })
        } else {
          const exists = collection.entries.some(
            (entry) => entry.movie.id === parseInt(this.idMovie),
          )
          if (
            (!exists &&
              backupCollectionId.length >= 1 &&
              backupCollectionId.some((backup) => backup.id !== collection.id)) ||
            backupCollectionId.length === 0
          ) {
            this.collectionsSelect.push({
              id: collection.id,
              name: collection.title,
            })
          }
        }
        backupCollectionId.push(collection.id)
      })
    },
    async addCollection() {
      if (this.chooseAddCollection != null && typeof this.chooseAddCollection === 'number') {
        await this.addNewMovieOnList(await this.setupListRequest(this.chooseAddCollection))
        await this.updateCollection()
      }
    },
  },
  async mounted() {
    this.collections = toRaw(
      await JudgementAPI.mounted(
        'GET',
        `users/${VueCookies.get('idUser')}/collections`,
        '',
        undefined,
        '',
      ),
    )
    await this.existedCollection()
  },
}
</script>

<template>
  <div class="col-12 cl-sm-12 col-md-4 col-lg-4">
    <select
      v-if="Object.values(this.collectionsSelect).length > 0"
      class="form-select"
      @change="addCollection()"
      v-model="chooseAddCollection"
    >
      <option selected>L'ajouter a une collection</option>
      <option v-for="choice in this.collectionsSelect" :value="choice.id">
        {{ choice.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
