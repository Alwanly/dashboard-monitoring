<template>
  <div>        
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container elevation-5 class="rounded-lg">
      <v-layout row wrap> 
        <v-flex sm3 xs6 md3 lg3>
          <v-card class="ma-3" color="green">
            <v-list-item>
              <v-list-item-avatar  tile class="mt-1">                
                  <v-icon dark large>account_circle</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content>
                <div class="">New users</div>
                <v-list-item-title class="headline mb-1 white--text text-right">1000</v-list-item-title>                
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
    </v-container>
    <v-container elevation-5 class="rounded-lg mt-6" >
      <h2 class="subheading grey--text mb-4">Users Access</h2>            
        <line-chart class="mb-3" :style="line_chart" :height="120" ></line-chart>              
    </v-container>    
    <v-container elevation-5 class="rounded-lg mt-6" style="" >
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

  </div>
</template>

<script>
import axios from 'axios';
import LineChart from '../LineChart.js'
const base_url = "http://127.0.0.1:8000/api/";
export default {
  name: 'Home',
  components:{
    LineChart
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
          value:'created_at'
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
      axios.get(base_url+'users/aktivitas')
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