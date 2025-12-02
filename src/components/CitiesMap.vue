<template>
  <Header/>
  <section class="d-flex align-items-center flex-column">
    <div id="mapContainer" style="height:600px; width:800px"></div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header.vue";
import L from "leaflet";
import {LGeoJson, LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";

export default {
  name: 'CitiesMap',
  components: {
    Header,
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = L.map("mapContainer").setView([51.959, -8.623], 12);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }
};
</script>

<style scoped>
</style>
