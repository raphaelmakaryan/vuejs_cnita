<script>
import { toRaw } from 'vue'
import JudgementAPI from '@/components/API/JudgementAPI.vue'
import CollectionName from '@/components/judgement/collections/CollectionName.vue'
import CollectionMovie from '@/components/judgement/collections/CollectionMovie.vue'

export default {
  name: 'EditCollectionJudgement',
  data() {
    return {
      valueIdList: this.$route.params.id,
      list: [],
      listRequest: [],
      newBody: {
        title: null,
        entries: null,
      },
    }
  },
  components: {
    CollectionMovie,
    CollectionName,
  },
  methods: {
    async updateCollection() {
      switch (this.newBody.title) {
        case null:
          this.newBody.title = this.list.title
          break
      }
      console.log(this.newBody)
      /*
      let body =
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `custom_lists/${this.oldList.id}`,
          body,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
      )
       */
    },
  },
  async mounted() {
    this.list = toRaw(
      await JudgementAPI.mounted('GET', `custom_lists/${this.valueIdList}`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <form @submit.prevent="updateCollection">
    <CollectionName :nameCollection="list.title" @updateName="newBody.title = $event" />
    <CollectionMovie :backupList="list" @updateList="newBody.entries = $event" />
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
