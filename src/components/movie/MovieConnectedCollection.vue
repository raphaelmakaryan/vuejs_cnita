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
      collectionRequest: [],
      chooseAddCollection: null,
      newBody: {
        entries: [],
      }
    }
  },
  methods: {
    async getCollections() {
      this.collections = toRaw(
        await JudgementAPI.mounted(
          'GET',
          `users/${VueCookies.get('idUser')}/collections`,
          '',
          undefined,
          '',
        ),
      )
    },
    async addCollection() {
      if (this.chooseAddCollection != null && typeof this.chooseAddCollection === 'number') {
        await this.setupListRequest(this.chooseAddCollection)
        await this.updateCollection()
      }
    },
    async updateCollection() {
      this.newBody.entries = this.collectionRequest
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `custom_lists/${this.chooseAddCollection}`,
          this.newBody,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
        'Vous avez ajouter le film a la collection !',
      )
    },
    async setupListRequest(id) {
      let newIndex = null
      this.collections.member.forEach((collection) => {
        if (collection.id === id) {
          if (collection.entries.length === 0) {
            this.collectionRequest.push({
              position: 1,
              movie: `/api/movies/${this.idMovie}`,
            })
          } else {
            collection.entries.forEach((element, index) => {
              let i = index + 1
              this.collectionRequest.push({
                position: i,
                movie: `/api/movies/${element.movie.id}`,
              })
              newIndex = i
            })
          }
        }
      })
      return newIndex
    },
    async status(data, texte) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert(texte)
        window.location.reload()
      }
    },
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
            !exists &&
            backupCollectionId.length >= 1 &&
            backupCollectionId.some((backup) => backup.id !== collection.id)
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
  },
  async mounted() {
    await this.getCollections()
    await this.existedCollection()
  },
}
</script>

<template>
  <div class="col-12 cl-sm-12 col-md-4 col-lg-4">
    <select v-if="Object.values(this.collectionsSelect).length > 0" class="form-select" @change="addCollection()"
      v-model="chooseAddCollection">
      <option selected>L'ajouter a une collection</option>
      <option v-for="choice in this.collectionsSelect" :value="choice.id">
        {{ choice.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
