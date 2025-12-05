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
    <td>{{ name }}</td>
    <td>{{ weather }}</td>
    <td>{{ temperature }}</td>
    <td>{{ updatedAt }}</td>
  </tr>

</template>

<style scoped>

</style>
