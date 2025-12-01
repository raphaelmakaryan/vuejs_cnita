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
      let requestCity = document.getElementById("requestCity")
      let resultCity = document.getElementById("resultCity")
      fetch("https://api.openweathermap.org/data/2.5/find?lat=45.758&lon=4.765&cnt=20&cluster=yes&lang=fr&units=metric&APPID=952ad6f7aff642444bb40b79e0afce96")
        .then(response => response.json())
        .then(data => {
          setTimeout(() => {
            requestCity.style.display = "none";
            resultCity.style.display = "block";
            this.cities = data.list;
          }, "1000");
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
    <div class="row" id="requestCity" style="display: block;">
      <div class="col-12 my-5">
        <h2 class="fs-2 text-center fst-italic">Requete en cours</h2>
      </div>
    </div>
    <div class="row" id="resultCity" style="display: none;">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">ville</th>
              <th scope="col">temps</th>
              <th scope="col">temperature</th>
              <th scope="col">date</th>
            </tr>
            </thead>
            <tbody class="table-group-divider">
            <City
              v-for="city in cities"
              :key="city.id"
              :name="city.name"
              :weather="city.weather[0].description"
              :temperature="city.main.temp"
              :updatedAt="format(new Date())"
            />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
