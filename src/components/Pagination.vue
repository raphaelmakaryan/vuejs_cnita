<script>
export default {
  name: "Pagination",
  props: {
    currentPage: Number,
    totalPages: Number,
    function: Function,
  },
  computed: {
    paginationButtons() {
      if (this.currentPage === 1 || this.currentPage === 2) {
        return [1, 2, 3];
      } else if (this.currentPage === this.totalPages || this.currentPage === this.totalPages - 1) {
        return [this.totalPages - 2, this.totalPages - 1, this.totalPages];
      } else {
        return [this.currentPage - 1, this.currentPage, this.currentPage + 1];
      }
    }
  }
}
</script>

<template>
  <div class="d-flex flex-row pagination justify-content-center my-3">
    <button
      type="button"
      v-for="button in paginationButtons"
      :key="button"
      :class="{
        'btn': true,
        'btn-primary': true,
        'btn-active': button === currentPage,
        'mx-1': true
      }"
      @click="$props.function(button)"
    >
      {{ button }}
    </button>
  </div>
</template>

<style scoped>
.btn-active {
  background-color: #5cb85c !important;
  border-color: #5cb85c !important;
}

</style>
