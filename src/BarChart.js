import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February','Maret','April','Mei','Juni','Juli','Agustus','Septerm','November','Desember'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20,10,50,100,120,30,100,10,300,500]
        }
      ]
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
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }    
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}