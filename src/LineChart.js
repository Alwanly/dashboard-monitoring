import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: ['January', 'February','Maret','April','Mei','Juni','Juli','Agustus','Septerm','November','Desember'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20,10,50,100,120,30,100,10,300,10]
        }
      ]
      // type:Object,
      // default:null
    },  
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            display: true
          },
          stacked:false
        }],
        xAxes: [ {
          gridLines: {
            display: false
          }
        }]
      },
      responsive: false,
      maintainAspectRatio: false
    }    
  }),

  mounted () {
    this.renderChart(this.chartdata)
  }
}