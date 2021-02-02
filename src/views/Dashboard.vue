<template>
  <div>        
    <h1 class="subheading grey--text">Dashboard</h1>        
      <v-layout row wrap >                                      
        <v-flex sm3 xs6 md3 lg3 >                    
          <v-card class="ma-3" color="blue">            
            <v-list-item>
              <v-list-item-avatar size="75" tile class="mt-1">                
                  <v-icon dark size="75" >supervised_user_circle</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content class="text-center">
                <div class="text-h5 white--text">Total Users</div>
                <v-list-item-title class="mb-1 white--text text-h4">{{totalUser}}</v-list-item-title>                
              </v-list-item-content>              
            </v-list-item>          
          </v-card>          
        </v-flex>    
         <v-flex sm3 xs6 md3 lg3  >                    
          <v-card class="ma-3" color="green">            
            <v-list-item>
              <v-list-item-avatar size="75" tile class="mt-1">                
                  <v-icon dark size="75" >account_circle</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content class="text-center">
                <div class="text-h5 white--text">User Active</div>
                <v-list-item-title class="mb-1 white--text text-h4">{{totalUserActive}}</v-list-item-title>                
              </v-list-item-content>              
            </v-list-item>          
          </v-card>          
        </v-flex>  
         <v-flex sm3 xs6 md3 lg3>                    
          <v-card class="ma-3" color="red">            
            <v-list-item>
              <v-list-item-avatar size="75" tile class="mt-1">                
                  <v-icon dark size="75" >show_chart</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content class="text-center">
                <div class="text-h5 white--text">Monthly Visit</div>
                <v-list-item-title class="mb-1 white--text text-h4">{{monthlyVisit}}</v-list-item-title>                
              </v-list-item-content>              
            </v-list-item>          
          </v-card>          
        </v-flex>  
         <v-flex sm3 xs6 md3 lg3 >                    
          <v-card class="ma-3" color="blue">            
            <v-list-item>
              <v-list-item-avatar size="75" tile class="mt-1">                
                  <v-icon dark size="75" >account_balance_wallet</v-icon>                
              </v-list-item-avatar>
              <v-list-item-content class="text-center">
                <div class="text-h5 white--text">Monthly Transaction</div>
                <v-list-item-title class="mb-1 white--text text-h4">{{totalTransaction}}</v-list-item-title>                
              </v-list-item-content>              
            </v-list-item>          
          </v-card>          
        </v-flex>                   
      </v-layout>    
    <v-layout row align-content-space-around>
      <v-flex lg9 >        
        <v-container>
          <h2 class="subheading grey--text mb-4">Users location</h2>  
          <GmapMap
          :center="{lat:-6.1741, lng:106.8296}"
          :zoom="5"              
          style="width: 100%; height: 350px">
          <GmapCluster                    
          >
          <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"/>
          </GmapCluster>
          </GmapMap>                             
        </v-container>     
        <!-- <v-container>
          <h2 class="subheading grey--text mb-4">Mobile usage</h2>            
            <line-chart class="mb-3" :style="line_chart" :height="110" ></line-chart>                                        
        </v-container>      -->
    </v-flex>        
    <v-flex lg3>
      <v-container class="rounded-lg mt-6" style=""  >                    
        <pie-chart v-if="chartdataUserType" :chartdata="chartdataUserType" :options="options"/>         
        <v-spacer></v-spacer>   
                
        <pie-chart v-if="chartdataMobileType" :chartdata="chartdataMobileType" :options="options"/>            
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
// import LineChart from '../LineChart.js'
import PieChart from '../PieChart.js'
export default {
  name: 'Home',
  components:{
    // LineChart,    
    PieChart
  },  
  data (){
    return{
      map:null,
      search:'',      
      activitasUser:[],
      loaded:false,
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
      },
      totalUser:0,
      totalUserActive:0,
      monthlyVisit:0,
      totalTransaction:0,
      marker:[],
      // {
      //   labels: ['New Users', 'Eksisting'],
      //   datasets: [
      //     {          
      //       backgroundColor:['red','blue'],          
      //       data: [40,20]
      //     }               
      //   ] 
      // },
      chartUserType: null, 
      chartMobileType: null, 
      options: { 
        responsive: true,
        maintainAspectRatio: true
      }
    }
  },
  computed:{
    itemCard: function(){
      return this.dataCard
    },
    markers(){
      return this.marker
    },
    chartdataUserType(){
      console.log(this.chartUserType)
      return this.chartUserType
    },
    chartdataMobileType(){
      return this.chartMobileType
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
    getCardData:function(){      
      axios.all([
        axios.get('users/total'),
        axios.get('users/aktif'),
        axios.get('users/visitor'),
        axios.get('users/transaction')
      ]).then(axios.spread((total,aktif,visitor,transaction)=>{          
        this.totalUser = total.data.total_user
        this.totalUserActive = aktif.data.total_user_aktif
        this.monthlyVisit = visitor.data.user_visit
        this.totalTransaction = transaction.data.this_month_total
      })).catch(err=>{
        console.error(err)
      })
    },
    getUserLocation:function(){
      axios.get("users/location")
      .then(resp=>{        
        this.marker = resp.data.data
      }).catch(err=>{
        console.error(err)
      })
    },
    getUsertype:function(){
      axios.get("users/type")
      .then(resp=>{
        this.chartUserType={
          labels:['New User','Existing User'],
          datasets:[
            {
              data:[resp.data.new_user,resp.data.exiting_user],
              backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(54, 162, 235, 0.2)']
            }
          ]

        }        
      }).catch(err=>{
        console.error(err)
      })
    },
    getMobileType:function(){
      this.loaded = false
      axios.get("users/mobile/usage")
      .then(resp=>{
        this.chartMobileType={
          labels:[resp.data.data[0].os,resp.data.data[1].os],
          datasets:[
            {
              data:[resp.data.data[0].total_user,resp.data.data[1].total_user],
              backgroundColor: ['rgba(255, 99, 132, 0.5)','rgba(54, 162, 235, 0.2)']
            }
          ]
        }        
        this.loaded = true
      }).catch(err=>{
        console.error(err)
      })
    },
    runMethod:function(){ 
      setInterval(()=>{
        this.getUserLocation()
        this.getUsertype()
        this.getMobileType()
      }, 50000)
      setInterval(() => {
        console.count()
        this.getActivitasUser()
        this.getCardData()             
      }, 5000);                          
    }    
  },
  mounted(){     
    this.getMobileType()
    this.getUsertype() 
    this.getUserLocation()
    this.getCardData()    
    this.runMethod()      
  }  
}
</script>
<style scoped>
  
</style>