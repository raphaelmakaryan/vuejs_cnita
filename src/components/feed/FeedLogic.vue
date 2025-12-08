<template>
  <div
    class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4 my-2 d-flex align-items-center flex-column"
    v-for="feed in feedData.items"
  >
    <div class="card" style="width: 18rem">
      <div class="card-body rounded">
        <h5 class="card-title">
          <router-link :to="{ path: '/user/' + feed.data.user.id }" class="user-link">
            {{ feed.data.user.username }}
          </router-link>
          <span class="activity-text text-white">
            a crée {{ this.typeVerification(feed.type.toLowerCase()) }} !
          </span>
        </h5>
        <p class="card-text text-secondary">Date de creation : {{ format(feed.createdAt) }}</p>
        <router-link
          class="btn btn-primary"
          :to="this.linkSpecifically(feed.type.toLowerCase(), feed)"
          >Voir</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'timeago.js'

export default {
  name: 'FeedLogic',
  props: {
    feedData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    format,
    typeVerification(value) {
      switch (value) {
        case 'rating':
          return 'un nouveau vote'
        default:
          return 'une nouvelle ' + value
      }
    },
    linkSpecifically(value, data) {
      if (value === 'collection') {
        return { name: 'ListJudgementPage', params: { id: data.data.id } }
      } else {
        return { name: 'MovieJudgementPage', params: { id: data.data.movie.id } }
      }
    },
  },
}
</script>

<style scoped>
.card-body {
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.user-link {
  font-weight: 600;
  color: var(--color-yellow-primary);
  font-size: 1.05rem;
}

.user-link:hover {
  text-decoration: underline;
}

.activity-text {
  font-size: 1rem;
}

.card-text {
  font-size: 0.875rem;
}

.card {
  --bs-card-border-color: unset !important;
  --bs-card-bg: unset !important;
}
</style>
