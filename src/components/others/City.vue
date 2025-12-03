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
  <tr>
    <td>{{ $props.name }}</td>
    <td>{{ $props.weather }}</td>
    <td>{{ $props.temperature }}</td>
    <td>{{ $props.updatedAt }}</td>
  </tr>

</template>

<style scoped>

</style>
