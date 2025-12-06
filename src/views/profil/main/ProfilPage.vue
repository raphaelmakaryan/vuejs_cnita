<script>
import UserProfil from '@/components/profil/UserProfil.vue'
import UserFollowers from '@/components/profil/UserFollowers.vue'
import UserFollow from '@/components/profil/UserFollow.vue'
import UserList from '@/components/profil/UserList.vue'
import UserRating from '@/components/profil/UserRating.vue'
import UserReview from '@/components/profil/UserReview.vue'

export default {
  name: 'ProfilJudgement',
  components: { UserReview, UserList, UserFollow, UserProfil, UserFollowers, UserRating },
}
</script>

<template>
  <UserProfil />
  <UserFollowers />
  <UserFollow />
  <UserList />
  <UserRating />
  <UserReview />
</template>

<style scoped></style>
