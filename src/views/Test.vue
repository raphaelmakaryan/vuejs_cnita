<script>
import draggable from 'vuedraggable'
import {ref} from "vue";

const meals = ref([
  'Hamburger',
  'Pizza',
  'Spaghetti',
  'Tacos',
  'Teriyaki Chicken',
]);

export default {
  name: 'Test',
  data() {
    return {
      meals,
      test: "null"
    }
  },
  components: {
    draggable
  }
};
</script>

<template>

  <section class="mt-5">
    <div class="container">
      <div class="row my-5">
        <div class="col-12">
          <p class="fs-1">Page de test</p>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-12">
          <p class="fs-2">Drag and drop</p>
        </div>
        <div class="col-12">
          <draggable v-model="this.meals" tag="ul" :itemKey="this.test">
            <template #item="{ element: meal }">
              <li>{{ meal }}</li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </section>


</template>

<style scoped>
</style>
