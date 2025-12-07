<script>
import { format } from 'timeago.js'
import { toRaw } from 'vue'
import JudgementAPI from '@/components/JudgementAPI.vue'
import VueCookies from 'vue-cookies'

export default {
  name: 'UserProfil',
  data() {
    return {
      user: [],
    }
  },
  methods: {
    format,
  },
  async mounted() {
    this.user = toRaw(
      await JudgementAPI.mounted('GET', `users/${VueCookies.get('idUser')}`, '', undefined, ''),
    )
  },
}
</script>

<template>
  <section class="mt-5">
    <div class="container">
      <div class="row">
        <div
          class="col-12 col-lg-2 d-flex align-items-center justify-content-center flex-column m-3"
          id="avatar"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </div>
        <div class="col-12 col-lg-8 d-flex align-items-start flex-column mt-3">
          <p class="fs-2" id="username">
            {{ user.username }}
          </p>
        </div>
        <div class="col-12 col-lg-2 d-flex  flex-column mt-2">
          <router-link to="/profil/edit" class="btn btn-primary">
            Modifier votre profil
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  background: linear-gradient(135deg, var(--color-bg-secondary), var(--color-bg-tertiary));
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-xl);
}

#avatar {
  width: 120px;
  height: 120px;
  min-width: 120px;
  background: var(--color-bg-elevated);
  border: 3px solid var(--color-accent-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-accent-primary);
}

#avatar svg {
  width: 60%;
  height: 60%;
}
#username {
  margin-bottom: var(--spacing-sm);
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
