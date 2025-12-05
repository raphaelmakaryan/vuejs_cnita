<script>
import HeaderJudgement from "@/components/judgement/HeaderJudgement.vue";
import JudgementAPI from "@/components/API/JudgementAPI.vue";
import {format} from 'timeago.js';
import {toRaw} from "vue";
import VueCookies from "vue-cookies";
import {tr} from "timeago.js/lib/lang/index.d.ts";

export default {
  name: "MovieJudgement",
  components: {HeaderJudgement},
  computed: {
    VueCookies() {
      return VueCookies
    }
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
      chooseAddCollectionPrivate: null,
      allRatingsMoviePublic: [],
      ratingsUserPrivate: null,
      reviewUserPrivate: null,
    };
  },
  methods: {
    format,
    async getDetailMovie() {
      this.moviePublic = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}`, "", undefined, ""))
    },
    async getListsMovie() {
      let data = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}/custom_list_entries?page=1&itemsPerPage=30`, "", undefined, ""))
      this.listsPublic = data.member
    },
    async getRatingMovie() {
      let data = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}/ratings?page=1&itemsPerPage=30`, "", undefined, ""))
      this.ratingsPublic = data.member
    },
    async existedCollection() {
      if (VueCookies.get('tokenUser') && VueCookies.get('idUser')) {
        this.allCollectionPrivate = toRaw(await JudgementAPI.mounted("GET", `users/${VueCookies.get('idUser')}/collections`, "", undefined, ""))
        let backupCollectionId = []
        this.allCollectionPrivate.member.forEach((collection) => {
          collection.entries.forEach((movie) => {
            const exists = collection.entries.some(entry =>
              entry.movie.id === parseInt(this.valueIdMovie)
            );
            if (!exists && backupCollectionId.some(backup => backup.id !== collection.id)) {
              this.collectionsSelectPrivate.push({
                id: collection.id,
                name: collection.title
              });
            }
            backupCollectionId.push(collection.id);
          })
        })
      }
    },
    async addCollection() {
      if (this.chooseAddCollectionPrivate != null && typeof this.chooseAddCollectionPrivate === "number") {
        await this.addNewMovieOnList(await this.setupListRequest(this.chooseAddCollectionPrivate))
        await this.updateCollection()
      }
    },
    async setupListRequest(id) {
      let newIndex = null
      this.allCollectionPrivate.member[id - 1].entries.forEach((element, index) => {
        let i = index + 1
        this.newCollectionPrivate.push(
          {
            "position": i,
            "movie": `/api/movies/${element.movie.id}`
          },
        );
        newIndex = i;
      });
      return newIndex;
    },
    async addNewMovieOnList(i) {
      this.newCollectionPrivate.push(
        {
          "position": i + 1,
          "movie": `/api/movies/${this.valueIdMovie}`
        },
      );
    },
    async updateCollection() {
      let body =
        {
          "entries": this.newCollectionPrivate
        }
      await this.status(await JudgementAPI.mounted("PATCH", `custom_lists/${this.chooseAddCollectionPrivate}`, body, "application/merge-patch+json", VueCookies.get('tokenUser')), "Vous avez ajouter le film a la collection !");
    },
    async status(data, texte) {
      if (data.status) {
        alert(data.detail);
      } else {
        alert(texte);
        window.location.reload();
      }
    },
    async existedRatingUser() {
      if (VueCookies.get('tokenUser') && VueCookies.get('idUser')) {
        let data = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}/ratings?page=1&itemsPerPage=30`, "", undefined, ""))
        if (data.totalItems > 0) {
          let backupUserId = []
          data.member.forEach((ratings) => {
            backupUserId.push(ratings.user.id)
          })
          const memeUser = backupUserId.some(rating =>
            rating === parseInt(VueCookies.get('idUser'))
          );
          if (!memeUser) {
            this.ratingsUserPrivate = true
          }
        } else {
          this.ratingsUserPrivate = true
        }
      }
    },
    async existedReviewUser() {
      if (VueCookies.get('tokenUser') && VueCookies.get('idUser')) {
        let data = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}/reviews?page=1&itemsPerPage=30`, "", undefined, ""))
        if (data.totalItems > 0) {
          let backupUserId = []
          data.member.forEach((ratings) => {
            backupUserId.push(ratings.user.id)
          })
          const memeUser = backupUserId.some(rating =>
            rating === parseInt(VueCookies.get('idUser'))
          );
          if (!memeUser) {
            this.reviewUserPrivate = true
          }
        } else {
          this.reviewUserPrivate = true
        }
      }
    },
    async getReviewMovie() {
      this.reviewPublic = toRaw(await JudgementAPI.mounted("GET", `movies/${this.valueIdMovie}/reviews`, "", undefined, ""))
    }
  },
  async mounted() {
    await this.getDetailMovie();
    await this.getListsMovie();
    await this.getRatingMovie();
    await this.getReviewMovie();
    await this.existedCollection();
    await this.existedRatingUser()
    await this.existedReviewUser()
  }
}
</script>

<template>
  <HeaderJudgement/>

  <section v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')" class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12 cl-sm-12 col-md-4 col-lg-4">
          <select v-if="Object.values(this.collectionsSelectPrivate).length > 0" class="form-select"
                  v-for="choice in this.collectionsSelectPrivate"
                  @change="addCollection()"
                  v-model="chooseAddCollectionPrivate">
            <option selected>L'ajouter a une collection</option>
            <option :value="choice.id">{{ choice.name }}</option>
          </select>
        </div>
        <div class="col-12 col-sm-12 col-md-4 col-lg-4 d-flex flex-column align-items-center">
          <router-link class="btn btn-success" v-if="ratingsUserPrivate"
                       :to="{path: '/judgement/movie/' + this.valueIdMovie + '/rating' }">
            Voter le film
          </router-link>
          <button type="button" class="btn btn-success" v-else-if="!ratingsUserPrivate" disabled>
            Voter le film
          </button>
        </div>
        <div class="col-12 cl-sm-12 col-md-4 col-lg-4">
          <router-link class="btn btn-success" v-if="reviewUserPrivate"
                       :to="{path: '/judgement/movie/' + this.valueIdMovie + '/review' }">
            Crée une review
          </router-link>
          <button type="button" class="btn btn-success" v-else-if="!reviewUserPrivate" disabled>
            Crée une review
          </button>
        </div>
      </div>
    </div>
  </section>

  <section id="detailMovie" class="my-5" v-if="Object.keys(this.moviePublic).length >= 1">
    <div class="container border rounded">
      <div class="row">
        <div class="col-3">
          <img :src="moviePublic.poster ? moviePublic.poster : 'https://placehold.co/600x400'"
               class="img-fluid w-100" :alt="moviePublic.title">
        </div>
        <div class="col-9">
          <p class="fs-5 fw-bold">{{ moviePublic.title }}</p>
          <p class="fs-6">{{ moviePublic.fullPlot }}</p>
          <p class="fs-6"><span class="text-decoration-underline">Sortie en :</span> {{
              moviePublic.year
            }}
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Directeurs :</span>
            <span class="mx-1" v-for="director in moviePublic.directors">
              <router-link :to="{path: '/judgement/director/' + director.id }">
              {{ director.fullName }}
              </router-link>
          </span>
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Acteurs :</span>
            <span class="mx-1" v-for="actor in moviePublic.castMembers">
                 <router-link :to="{path: '/judgement/cast/' + actor.id }">{{
                     actor.fullName
                   }}</router-link>
          </span>
          </p>
          <p class="fs-6"><span class="text-decoration-underline">Crée au(x) :</span>
            <span class="mx-1" v-for="country in moviePublic.countries">
            {{ country }}
          </span>
          </p>
          <p class="fs-6">
            <span class="text-decoration-underline">Vote IMDB :</span>
            {{ moviePublic.imdb?.rating ?? 0 }} pour
            {{ moviePublic.imdb?.votes ?? 0 }} votes
          </p>

          <p class="fs-6">
            <span class="text-decoration-underline">Vote Tomatoes :</span>
            {{ moviePublic.tomatoes?.rating ?? 0 }} pour
            {{ moviePublic.tomatoes?.votes ?? 0 }} votes
          </p>

          <p class="fs-6"><span class="text-decoration-underline">Genres :</span> <span class="mx-1"
                                                                                        v-for="genre in moviePublic.genres">
             <router-link :to="{path: '/judgement/genres/' + genre.id + '/movies'}">
            {{ genre.label }}
             </router-link>
          </span></p>
        </div>
      </div>
    </div>
  </section>

  <section id="otherDetail" class="my-5">
    <div class="container-fluid">
      <div class="row my-2">
        <div class="col-lg-1"></div>
        <div class="col-5 border rounded m-2" v-if="Object.keys(this.listsPublic).length >= 1"
             id="collectionsMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Collections</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2"
                   v-for="list in this.listsPublic">
                <router-link :to="{path: '/judgement/list/' + list.id}">
                  <p class="fs-6 m-0 text-decoration-underline fw-bold text-black">{{
                      list.customList.title
                    }}</p>
                </router-link>

                <p class="fs-6 m-0 text-black "><span
                  class="text-decoration-underline me-1">Crée par : </span>
                  <router-link :to="{path: '/judgement/user/' + list.customList.user.id }"
                  >{{
                      list.customList.user.username
                    }}
                  </router-link>
                </p>

                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Crée le : </span>{{
                    format(list.customList.createdAt)
                  }}
                </p>
                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Derniere mise a jour le : </span>{{
                    format(list.customList.updatedAt)
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 border rounded m-2" v-if="Object.keys(this.ratingsPublic).length >= 1"
             id="ratingMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Votes</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2"
                   v-for="rating in this.ratingsPublic">
                <p class="fs-6 m-0 text-decoration-underline fw-bold">{{ rating.note }} /
                  10</p>
                <p class="fs-6 m-0"><span class="text-decoration-underline mx-1">Voté par : </span>
                  <router-link :to="{path: '/judgement/user/' + rating.user.id }"
                  >
                    {{ rating.user.username }}
                  </router-link>
                </p>
                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Crée le : </span>
                  {{ format(rating.user.createdAt) }}
                </p>
                <p class="fs-6 m-0"><span
                  class="text-decoration-underline">Derniere mise a jour le : </span>
                  {{ format(rating.user.updatedAt) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
      <div class="row my-2">
        <div class="col-lg-1"></div>
        <div class="col-10 border rounded m-2" v-if="this.reviewPublic.totalItems >= 1"
             id="collectionsMovie">
          <div class="container-fluid">
            <div class="row my-2">
              <div class="col-12">
                <p class="fs-5 fw-bold text-center">Reviews</p>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-12 d-flex flex-column border rounded my-2"
                   v-for="review in this.reviewPublic.member">
                <router-link :to="{path: '/judgement/user/' +   review.user.id}">
                  <p class="fs-6 my-2 text-decoration-underline fw-bold text-black">{{
                      review.user.username
                    }}</p>
                </router-link>
                <p class="font-monospace">{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-1"></div>
      </div>
    </div>
  </section>

</template>

<style scoped>
</style>
