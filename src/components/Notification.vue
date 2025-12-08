<script>
export default {
  name: 'Notification',
  props: {
    value: Boolean,
    text: String,
  },
}
</script>

<template>
  <div class="row my-2">
    <div class="col-12 d-flex justify-content-center">
      <div
        role="alert"
        :class="{
          'col-12': true,
          'alert-success': this.value,
          'bg-success': this.value,
          'bg-danger': !this.value,
          'alert-danger': !this.value,
          rounded: true,
          'm-1': true,
          alert: true,
        }"
      >
        <div class="d-flex align-items-center">
          <div>
            <svg id="success"
              v-if="this.value"
              width="32"
              height="32"
              viewbox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="white"></rect>
              <line x1="9.35355" y1="16.6464" x2="13.3536" y2="20.6464" stroke="white"></line>
              <line x1="23.3536" y1="11.3536" x2="13.3536" y2="21.3536" stroke="white"></line>
            </svg>
            <svg id="error"
              v-else-if="!this.text"
              width="32"
              height="32"
              viewbox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" y="0.5" width="31" height="31" rx="15.5" stroke="white"></rect>
              <line x1="21.3536" y1="11.3536" x2="11.3536" y2="21.3536" stroke="white"></line>
              <line x1="21.6464" y1="21.3521" x2="11.648" y2="11.3536" stroke="white"></line>
            </svg>
          </div>
          <div class="p-3">
            <span class="d-inline-block fw-semibold text-white">{{ text }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
