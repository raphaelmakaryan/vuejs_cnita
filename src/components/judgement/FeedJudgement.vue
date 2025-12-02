<script>
import {toRaw} from "vue";
import JudgementApi from "@/components/API/JudgementAPI.vue";

export default {
  name: "FeedJugment",
  data() {
    return {
      feed: []
    }
  },
  methods: {
    async getData() {
      this.feed = toRaw(await JudgementApi.mounted("feed"))
      console.log(this.feed);
    },
  },
  async mounted() {
    await this.getData();
  }
}
</script>

<template>
  <section class="my-5">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p class="fs-2">ARTICLES RECENTS</p>
          <hr>
        </div>
      </div>
      <div class="row ">
        <div
          class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 col-xxl-4 m-2 d-flex align-items-center flex-column">
          <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up
                the bulk of the card’s content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 col-xxl-4 m-2 d-flex align-items-center flex-column">
          <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up
                the bulk of the card’s content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 col-xxl-4 m-2 d-flex align-items-center flex-column">
          <div class="card" style="width: 18rem;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Card title</h5>
              <p class="card-text">Some quick example text to build on the card title and make up
                the bulk of the card’s content.</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>

</style>
