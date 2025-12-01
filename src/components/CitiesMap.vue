<script>
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header.vue";
import {LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";

export default {
  name: 'CitiesMap',
  components: {
    Header,
    LMap,
    LTileLayer,
  },
  data() {
    return {
      zoom: 2,
      showMap: true
    };
  },
}
</script>

<template>
  <Header/>
  <div style="height:600px; width:800px">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<style scoped>

</style>
