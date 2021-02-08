<template>
  <div>
    <h1 class="subheading grey--text">Trends Services</h1>
    <v-container elevation-5 class="rounded-lg">
      <h2 class="subheading grey--text mb-4"> Trends Services</h2>
        <bar-chart></bar-chart>
    </v-container>
  </div>
</template>

<script>
import BarChart from '../plugins/BarChart.js'
export default {
  components:{
    BarChart
  }
}
</script>
