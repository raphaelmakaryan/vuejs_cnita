<script>
import VueCookies from 'vue-cookies'
import Suscribe from '@/components/user/Suscribe.vue'
import UserInfo from '@/components/user/UserInfo.vue'
import UserFollowers from '@/components/user/UserFollowers.vue'
import UserFollows from '@/components/user/UserFollows.vue'
import UserCollections from '@/components/user/UserCollections.vue'
import UserRating from '@/components/user/UserRating.vue'
import UserReview from '@/components/user/UserReview.vue'

export default {
  name: 'UserJudgement',
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  data() {
    return {
      valueIdUser: parseInt(this.$route.params.id),
    }
  },
  components: {
    UserReview,
    UserRating,
    UserCollections,
    Suscribe,
    UserInfo,
    UserFollowers,
    UserFollows,
  }
}
</script>

<template>
  <Suscribe
    :idUser="this.valueIdUser"
    v-if="VueCookies.get('tokenUser') && VueCookies.get('idUser')"
  />
  <UserInfo :idUser="this.valueIdUser" />
  <UserFollowers :idUser="this.valueIdUser" />
  <UserFollows :idUser="this.valueIdUser" />
  <UserCollections :idUser="this.valueIdUser" />
  <UserRating :idUser="this.valueIdUser" />
  <UserReview :idUser="this.valueIdUser" />
</template>

<style scoped></style>
