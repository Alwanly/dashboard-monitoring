<template>
  <div>        
    <h1 class="subheading grey--text">Dashboard</h1>    
      <v-layout row wrap>         
        <v-flex sm3 xs6 md3 lg3>
          <v-card class="ma-3" color="green">
            <v-list-item>
              <v-list-item-avatar size="75" tile class="mt-1">                
                  <v-icon dark size="75" >account_circle</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="text-h6">New users</div>
                <v-list-item-title class="mb-1 white--text text-right text-h4">1000</v-list-item-title>                
              </v-list-item-content>              
            </v-list-item>          
          </v-card>
        </v-flex>
        <v-flex sm3 xs6 md3 lg3>          
          <v-card class="ma-3" color="green">
            <v-list-item>
              <v-list-item-avatar  tile class="mt-1">                
                  <v-icon dark large>account_circle</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="" >New users</div>
                <v-list-item-title class="headline mb-1 white--text text-right">
                  10000
                  </v-list-item-title>                
              </v-list-item-content>              
            </v-list-item>          
          </v-card>
        </v-flex>
      </v-layout>    
    <v-layout row align-content-space-around>
      <v-flex lg9 >        
        <v-container>
          <h2 class="subheading grey--text mb-4">Users Access</h2>            
            <line-chart class="mb-3" :style="line_chart" :height="110" ></line-chart>                              
          <h2 class="subheading grey--text mb-4">Users Access</h2>       
        <Map
        :countryData="{'US': 4, 'CA': 7, 'GB': 8, 'IE': 14, 'ES': 21}"
      highColor="#ff0000"
      lowColor="#aaaaaa"
      countryStrokeColor="#909090"
      defaultCountryFillColor="#dadada"       
        />       
        </v-container>     
    </v-flex>        
    <v-flex lg3>
      <v-container elevation-5 class="rounded-lg mt-6" style="" >        
        <pie-chart/>         
        <v-spacer></v-spacer>   
        <pie-chart/>            
        <v-spacer></v-spacer>   
        <h2 class="subheading grey--text mb-4">Users Access</h2>
        <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
        <v-data-table
        :headers="headers"
        :items="activitasUser"
        :items-per-page="5"
        :search="search"      
        class="elevation-1">
        </v-data-table>
      </v-container>
    </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '../LineChart.js'
import PieChart from '../PieChart.js'
import Map from 'vue-map-chart';
export default {
  name: 'Home',
  components:{
    LineChart,
    Map,
    PieChart
  },  
  data (){
    return{
      search:'',
      // newUser:null,
      // accessUsers:null,
      activitasUser:[],
      headers:[
        {
          text: "User IP",
          value: 'user_ip'
        },
        {
          text:"endPoint",
          value:'endpoint'
        },
        {
          text:'date',
          value:'Date'
        }
      ],
      line_chart:{
      height: '300px',    
      position: 'relative'        
      }  
    }
  },
  methods:{
    getActivitasUser:function(){      
      axios.get('users/aktivitas')
      .then(resp=>{
        this.activitasUser = resp.data.data
        console.log(this.headers);
      }).catch(err=> console.log(err))
    },
    
  },
  mounted(){
    this.getActivitasUser();
  }  
}
</script>
<style scoped>
  
</style>