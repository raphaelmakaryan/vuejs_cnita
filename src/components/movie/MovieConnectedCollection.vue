<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import router from '@/router/index.js'
import Notification from '@/components/Notification.vue'

export default {
  name: 'MovieConnectedCollectionJudgement',
  components: { Notification },
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
      valueNotification: null,
      textNotification: null,
      newBody: {
        entries: [],
      },
    }
  },
  methods: {
    async getCollections() {
      let data = await api({
        url: `users/${VueCookies.get('idUser')}/collections`,
        method: 'get',
      })
      this.collections = data.data
    },
    async addCollection() {
      if (this.chooseAddCollection != null && typeof this.chooseAddCollection === 'number') {
        await this.setupListRequest(this.chooseAddCollection)
        await this.updateCollection()
      }
    },
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = `Vous avez ajouter le film a la collection !`
      }
    },
    async updateCollection() {
      this.newBody.entries = this.collectionRequest
      let data = await api({
        url: `custom_lists/${this.chooseAddCollection}`,
        method: 'patch',
        data: this.newBody,
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        },
      })
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({ name: 'ProfilJudgement' })
      }, 2000)
    },
    async setupListRequest(id) {
      this.collections.member.forEach((collection) => {
        if (collection.id === id) {
          if (collection.entries.length === 0) {
            this.collectionRequest.push({
              position: 1,
              movie: `/api/movies/${this.idMovie}`,
            })
          } else {
            let newIndex = null
            collection.entries.forEach((element) => {
              this.collectionRequest.push({
                position: element.position,
                movie: `/api/movies/${element.movie.id}`,
              })
              newIndex = element.position + 1
            })
            this.collectionRequest.push({
              position: newIndex,
              movie: `/api/movies/${this.idMovie}`,
            })
          }
        }
      })
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
            (!exists && backupCollectionId.some((backup) => backup.id !== collection.id)) ||
            (!exists && backupCollectionId.length === 0)
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
  <Notification
    v-if="this.valueNotification != null && this.textNotification != null"
    :value="valueNotification"
    :text="textNotification"
  />
  <div class="col-12 col-sm-12 col-md-6 col-lg-6 d-flex justify-content-center flex-column">
    <div class="card p-4">
      <div>
        <p class="fs-4 text-white">Collections</p>
        <p class="fs-6 text-secondary">Ajouter ce film à vos collections</p>
      </div>
      <div>
        <select
          v-if="Object.values(this.collectionsSelect).length > 0"
          class="form-select"
          @change="addCollection()"
          v-model="chooseAddCollection"
          name="chooseAddCollection"
          aria-label="Default select example"
        >
          <option v-for="choice in this.collectionsSelect" :value="choice.id">
            {{ choice.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: var(--color-bg-secondary);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--color-yellow-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
</style>
