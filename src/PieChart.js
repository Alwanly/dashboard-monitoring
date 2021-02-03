import { Doughnut, } from 'vue-chartjs'
import "chartjs-plugin-datalabels";

export default {
  extends: Doughnut,
  props: ["data", "options"],
  mounted () {
    this.renderChart(this.data,this.options)
  }
}