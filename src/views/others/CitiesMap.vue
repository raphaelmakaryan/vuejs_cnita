<template>
  <Header/>
  <section class="d-flex align-items-center flex-column">
    <div id="mapContainer" style="height:600px; width:-webkit-fill-available;">
    </div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import HeaderMain from "@/components/others/HeaderMain.vue";
import L from "leaflet";
import {LGeoJson, LMap, LTileLayer} from "@vue-leaflet/vue-leaflet";
import {toRaw} from "vue";
import WeatherAPI from "@/components/API/weatherAPI.vue";

export default {
  name: 'CitiesMap',
  components: {
    Header: HeaderMain,
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      cities: [],
      map: null
    };
  },
  async mounted() {
    this.map = L.map("mapContainer").setView([51.959, -8.623], 12);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    await this.getData();
    await this.createMarkers()
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
  methods: {
    async getData() {
      this.cities = toRaw(await WeatherAPI.mounted())
    },
    async createMarkers() {
      this.cities.forEach((city) => {
        let iconWeather = L.icon({
          iconUrl: `https://openweathermap.org/img/wn/${city.weather[0].icon}.png`
        })
        let marker = L.marker([city.coord.lat, city.coord.lon], {icon: iconWeather})
        marker.bindPopup(city.name).openPopup();
        marker.addTo(this.map);
      })
    },
  }
};
</script>

<style scoped>
#mapContainer :deep(.leaflet-marker-icon) {
  //background: blue;
}
</style>
