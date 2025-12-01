<script>
import Header from "@/components/Header.vue";
import City from "@/components/City.vue";

export default {
  name: 'CitiestList',
  data() {
    return {
      name: 'Ma ville',
      weather: 'Peu nuageux',
      temperature: 20.55,
      updatedAt: new Date()
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
        <h1>bienvenue sur city</h1>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
