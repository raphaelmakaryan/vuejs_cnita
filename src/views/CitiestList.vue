<script>
import {format} from 'timeago.js';
import Header from "@/components/Header.vue";
import City from "@/components/City.vue";

export default {
  name: 'CitiestList',
  data() {
    return {
      cities: [
        {
          id: 1,
          name: 'Ville 1',
          weather: 'Ensoleillé',
          temperature: 22.0,
          updatedAt: format(new Date())
        },
        {
          id: 2,
          name: 'Ville 2',
          weather: 'Peu nuageux',
          temperature: 19.5,
          updatedAt: format(new Date())
        }
      ]
    }
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
          :weather="city.weather"
          :temperature="city.temperature"
          :updatedAt="city.updatedAt"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
