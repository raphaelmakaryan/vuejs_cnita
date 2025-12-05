<template>
  <router-view/>
</template>

<script>
import {onMounted} from 'vue';
import {useRouter} from 'vue-router';

export default {
  name: 'App',
  setup() {
    const router = useRouter();

    onMounted(() => {
      router.push('/');
    });
  }
};
</script>

<style>
</style>
