<script>
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import CollectionName from '@/components/collections/CollectionName.vue'
import CollectionMovie from '@/components/collections/CollectionMovie.vue'

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
    }
  },
  components: {
    CollectionMovie,
    CollectionName,
  },
  methods: {
    async updateCollection() {
      if (this.newBody.title === null) {
        this.newBody.title = this.list.title
      }
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `custom_lists/${this.oldList.id}`,
          this.newBody,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
      )
    },
  },
  async mounted() {
    this.list = toRaw(
      await JudgementAPI.mounted('GET', `custom_lists/${this.valueIdList}`, '', undefined, ''),
    ),
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
  <form @submit.prevent="updateCollection">
    <CollectionName :nameCollection="list.title" @updateName="newBody.title = $event" />
    <CollectionMovie :oldList="this.list" :oldListRequest="this.listRequest" @updateList="newBody.entries = $event" />
    <section class="my-5">
      <div class="container">
        <div class="row">
          <div class="col-12 my-2">
            <button type="submit" class="btn btn-primary w-100">Mettre a jour</button>
          </div>
        </div>
      </div>
    </section>
  </form>
</template>

<style scoped></style>
