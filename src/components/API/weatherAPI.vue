<script>
import {format} from 'timeago.js';

export default {
  name: 'weatherAPI',
  data() {
    return {
      cities: [],
      loading: false,
      error: null,
    }
  },
  methods: {
    format,
  },
  async mounted() {
    return await fetch("https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=952ad6f7aff642444bb40b79e0afce96")
      .then(response => response.json())
      .then(async data => {
        return await data.list
      })
  }
};
</script>

<template>

</template>

<style scoped>

</style>
