<script>
import {toRaw} from 'vue'
import api from "@/assets/api.js"
import CollectionName from '@/components/collections/CollectionName.vue'
import CollectionMovie from '@/components/collections/CollectionMovie.vue'
import Notification from '@/components/Notification.vue'
import VueCookies from 'vue-cookies'
import router from '@/router/index.js'

export default {
  name: 'EditCollectionJudgement',
  data() {
    return {
      valueIdList: this.$route.params.id,
      list: [],
      listRequest: [],
      newBody: {
        title: null,
        entries: [],
      },
      valueNotification: null,
      textNotification: null,
    }
  },
  components: {
    Notification,
    CollectionMovie,
    CollectionName,
  },
  methods: {
    async forNotification(data) {
      if (data.status) {
        this.valueNotification = false
        this.textNotification = data.detail
      } else {
        this.valueNotification = true
        this.textNotification = 'Vous avec modifié la liste !'
      }
    },
    async updateCollection() {
      if (this.newBody.title === null) {
        this.newBody.title = this.list.title
      }
      let data = await api.patch(`custom_lists/${this.valueIdList}`, {
        data: this.newBody,
        headers: {
          Authorization: 'Bearer ' + VueCookies.get('tokenUser'),
        }
      })
      document.getElementById("buttonCollection").setAttribute("disabled", "disabled")
      await this.forNotification(data.data)
      setTimeout(() => {
        router.push({name: 'ProfilJudgement'})
      }, 2000)
    },
  },
  async mounted() {
    let data = await api.get(`custom_lists/${this.valueIdList}`)
    this.list = data.data
    this.list.entries.forEach((element, index) => {
      this.listRequest.push({
        position: index + 1,
        movie: `/api/movies/${element.movie.id}`,
      })
    })
    this.newBody.entries = this.listRequest
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container">
      <Notification
        v-if="this.valueNotification != null && this.textNotification != null"
        :value="valueNotification"
        :text="textNotification"
      />
    </div>
  </section>
  <form @submit.prevent="updateCollection">
    <CollectionName :nameCollection="list.title" @updateName="newBody.title = $event"/>
    <CollectionMovie
      :oldList="this.list"
      :oldListRequest="this.listRequest"
      @updateList="newBody.entries = $event"
    />
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100" id="buttonCollection">Mettre a
              jour
            </button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped></style>
