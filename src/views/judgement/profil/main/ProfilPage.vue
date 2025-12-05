<script>
import UserProfil from '@/components/judgement/profil/UserProfil.vue'
import UserFollowers from '@/components/judgement/profil/UserFollowers.vue'
import UserFollow from '@/components/judgement/profil/UserFollow.vue'
import UserList from '@/components/judgement/profil/UserList.vue'
import UserRating from '@/components/judgement/profil/UserRating.vue'
import UserReview from '@/components/judgement/profil/UserReview.vue'

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
