<script>
import VueCookies from 'vue-cookies'
import api from '@/assets/api.js'
import ApexCharts from 'apexcharts'

export default {
  name: 'MovieChart',
  data() {
    return {
      dataChart: [],
    }
  },
  props: {
    idMovie: {
      type: String,
      required: true,
    },
  },
  computed: {
    VueCookies() {
      return VueCookies
    },
  },
  methods: {
    async getData() {
      let data = await api.get(`movies/${this.idMovie}`)
      this.dataChart = data.data
    },
    createChart() {
      if (this.dataChart.imdb.rating != null && this.dataChart.tomatoes.meter != null) {
        let options = {
          chart: {
            type: 'bar',
            height: 300,
          },
          series: [
            {
              name: 'Chart',
              data: [
                parseFloat(this.dataChart.imdb.rating) * 10,
                parseInt(this.dataChart.tomatoes.meter),
                (parseFloat(this.dataChart.imdb.rating) * 10 +
                  parseInt(this.dataChart.tomatoes.meter)) /
                  2,
              ],
            },
          ],
          xaxis: {
            categories: ['IMDB', 'Tomatoes', 'Moyenne'],
          },
        }
        let chart = new ApexCharts(document.getElementById('#forChartMovie'), options)
        chart.render()
      }
    },
  },
  async mounted() {
    await this.getData()
    this.createChart()
  },
}
</script>

<template>
  <div class="col-12 my-2" v-if="this.dataChart.length > 0">
    <div id="forChartMovie"></div>
  </div>
</template>

<style scoped></style>
