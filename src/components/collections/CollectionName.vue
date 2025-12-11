<script>

export default {
  name: 'CollectionName',
  data() {
    return {
      newName: null,
    }
  },
  props: {
    nameCollection: String,
  },
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2 mt-3 text-white">
            MODIFIER LA COLLECTION :
            <span class="fw-bold fst-italic">{{ nameCollection }}</span>
          </p>
          <hr />
        </div>
      </div>

      <div class="row my-2">
        <div class="col-12">
          <label for="newName" class="form-label">Nouveau nom de la collection</label>
          <input
            type="text"
            class="form-control"
            id="newName"
            v-model="newName"
            minlength="3"
            required
            :placeholder="nameCollection"
            @input="$emit('updateName', newName)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
