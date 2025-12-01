<script setup>

</script>

<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">ville</th>
        <th scope="col">temps</th>
        <th scope="col">temperature</th>
        <th scope="col">date</th>
      </tr>
      </thead>
      <tbody class="table-group-divider">
      <tr v-for="city in cities">
        <th scope="row">{{ city.id }}</th>
        <td>{{ city.name }}</td>
        <td>{{ city.weather }}</td>
        <td>{{ city.temperature }}</td>
        <td>{{ city.updatedAt }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="col-12" v-for="city in City.props">
    <div class="container my-5">
      <div class="row">
        <div class="col-3">
          <p>{{ city.name }}</p>
        </div>
        <div class="col-3">
          <p>{{ city.weather }}</p>
        </div>
        <div class="col-3">
          <p>{{ city.temperature }}</p>
        </div>
        <div class="col-3">
          <p>{{ city.updatedAt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
