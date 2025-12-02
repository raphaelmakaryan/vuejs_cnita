<script>
import HeaderMain from "../components/HeaderMain.vue";

export default {
  name: 'Home',
  methods: {
    alertButton() {
      window.alert("bien vu ta cliquer");
    }
  },
  components: {
    Header: HeaderMain
  }
};
</script>

<template>
  <Header/>

  <section class="container mt-5">
    <div class="row my-5">
      <div class="col-12">
        <h1 class="fs-1 text-center">Bienvenue sur la page d'accueil !</h1>
      </div>
    </div>
    <div class="row my-5 d-flex align-items-center flex-column">
      <div class="col-12 d-flex align-items-center flex-column">
        <button type="button" class="btn btn-warning w-50" @click="alertButton">Alerte la</button>
      </div>
    </div>
    <div class="row my-5">
      <div class="col-12 col-sm-12 col-md-4 col-lg-4  col-xl-4 col-xxl-4  boxHome p-5 m-1">
        <router-link to="/villes">Listes des villes</router-link>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4  col-xl-4 col-xxl-4  boxHome p-5 m-1">
        <router-link to="/carte">Carte</router-link>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4  col-xl-4 col-xxl-4  boxHome p-5 m-1">
        <a href="">
          Jugment
        </a>
      </div>
      <div class="col-12 col-sm-12 col-md-4 col-lg-4  col-xl-4 col-xxl-4  boxHome p-5 m-1">
        <router-link :to="{path: '/judgement/movie/20706' }">
          test
        </router-link>
      </div>


    </div>
  </section>

</template>

<style scoped>
.boxHome {
  background: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

.boxHome > a {
  text-decoration: none;
  color: white;
}

</style>
