<script>
export default {
  name: "City",
  props: {
    name: String,
    weather: String,
    temperature: Number,
    updatedAt: Date
  }
}
</script>

<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-3">
        <p>{{ $props.name }}</p>
      </div>
      <div class="col-3">
        <p>{{ $props.weather }}</p>
      </div>
      <div class="col-3">
        <p>{{ $props.temperature }}</p>
      </div>
      <div class="col-3">
        <p>{{ $props.updatedAt }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
