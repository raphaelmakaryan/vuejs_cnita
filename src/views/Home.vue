<script>
import Header from "../components/all/Header.vue";

export default {
  name: 'Home',
  methods: {
    alertButton() {
      window.alert("bien vu ta cliquer");
    }
  },
  components: {
    Header,
  }
};
</script>

<template>
  <Header/>

  <section class="container mt-5">
    <div class="row my-5">
      <div class="col-12">
        <h1>bienvenue sur le home</h1>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12">
        <button type="button" @click="alertButton">Alerte la</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
