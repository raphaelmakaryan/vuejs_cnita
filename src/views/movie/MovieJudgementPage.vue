<script>
import HeaderJudgement from '@/components/HeaderJudgement.vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import { format } from 'timeago.js'
import { toRaw } from 'vue'
import VueCookies from 'vue-cookies'
import { tr } from 'timeago.js/lib/lang/index.d.ts'
import MovieConnectedJudgement from '@/components/movie/MovieConnected.vue'
import MovieInfos from '@/components/movie/MovieInfos.vue'
import MovieConnectedCollectionJudgement from '@/components/movie/MovieConnectedCollection.vue'
import MovieCollections from '@/components/movie/MovieCollections.vue'

export default {
  name: 'MovieJudgement',
  components: {
    MovieCollections,
    MovieConnectedCollectionJudgement,
    MovieInfos,
    MovieConnectedJudgement,
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  data() {
    return {
      valueIdMovie: this.$route.params.id,
      moviePublic: [],
      listsPublic: [],
      reviewPublic: [],
      ratingsPublic: [],
      allCollectionPrivate: [],
      collectionsSelectPrivate: [],
      newCollectionPrivate: [],
      allRatingsMoviePublic: [],
      ratingsUserPrivate: null,
      reviewUserPrivate: null,
    }
  },
  methods: {
    format,
    async getRatingMovie() {
      let data = toRaw(
        await JudgementAPI.mounted(
          'GET',
          `movies/${this.valueIdMovie}/ratings?page=1&itemsPerPage=30`,
          '',
          undefined,
          '',
        ),
      )
      this.ratingsPublic = data.member
    },
    async setupListRequest(id) {
      let newIndex = null
      this.allCollectionPrivate.member.forEach((collection) => {
        if (collection.id === id) {
          if (collection.entries.length === 0) {
            this.newCollectionPrivate.push({
              position: 1,
              movie: `/api/movies/${this.valueIdMovie}`,
            })
          } else {
            collection.entries.forEach((element, index) => {
              let i = index + 1
              this.newCollectionPrivate.push({
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
    async addNewMovieOnList(i) {
      this.newCollectionPrivate.push({
        position: i + 1,
        movie: `/api/movies/${this.valueIdMovie}`,
      })
    },
    async updateCollection() {
      let body = {
        entries: this.newCollectionPrivate,
      }
      await this.status(
        await JudgementAPI.mounted(
          'PATCH',
          `custom_lists/${this.chooseAddCollectionPrivate}`,
          body,
          'application/merge-patch+json',
          VueCookies.get('tokenUser'),
        ),
        'Vous avez ajouter le film a la collection !',
      )
    },
    async status(data, texte) {
      if (data.status) {
        alert(data.detail)
      } else {
        alert(texte)
        window.location.reload()
      }
    },
    async getReviewMovie() {
      this.reviewPublic = toRaw(
        await JudgementAPI.mounted('GET', `movies/${this.valueIdMovie}/reviews`, '', undefined, ''),
      )
    },
  },
  async mounted() {
    //await this.getDetailMovie();
    //await this.getListsMovie();
    //await this.getRatingMovie();
    //await this.getReviewMovie();
    //await this.existedCollection();
    //await this.existedRatingUser()
    //await this.existedReviewUser()
  },
}
</script>

<template>
  <MovieConnectedJudgement
    :idMovie="valueIdMovie"
    v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"
  />
  <MovieInfos :idMovie="valueIdMovie" />

  <section id="otherDetail" class="my-5">
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-lg-1"></div>
        <MovieCollections :idMovie="valueIdMovie" />
        <div class="col-lg-1"></div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
