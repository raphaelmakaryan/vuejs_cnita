<script>
import {format} from 'timeago.js';
import Header from "@/components/Header.vue";
import City from "@/components/City.vue";

export default {
  name: 'CitiestList',
  data() {
    return {
      cities: [],
      loading: false,
      error: null,
    }
  },
  methods: {
    format,
    requestAPI() {
      fetch("https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=952ad6f7aff642444bb40b79e0afce96")
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.cities = data.list;
        })
    }
  },
  mounted() {
    this.requestAPI();
  },
  components: {
    Header,
    City
  }
};
</script>

<template>
  <Header/>
  <section class="container mt-5">
    <div class="row">
      <div class="col-12">
        <h1 class="fs-1">Listes des villes</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <City
          v-for="city in cities"
          :key="city.id"
          :name="city.name"
          :weather="city.weather[0].description"
          :temperature="city.main.temp"
          :updatedAt="format(new Date())"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
