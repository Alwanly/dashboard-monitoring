<template>
   <v-card class="ma-3" :color="color">            
            <v-list-item>
              <v-list-item-content class="text-left">                
                <v-list-item-title class="mb-1 white--text text-h5 font-weight-bold">{{number}}</v-list-item-title>                
                <v-list-item-subtitle class="white--text font-weight-light">{{label}}</v-list-item-subtitle> 
              </v-list-item-content>   
              <v-list-item-avatar size="90" tile class="mt-1">                
                  <v-icon size="100" >{{icon}}</v-icon>                
              </v-list-item-avatar>                       
            </v-list-item>          
          </v-card>   
</template>
<script>
import {gsap} from 'gsap';
export default { 
    props:{
        icon:String,
        color:String,
        label:String,
        value:Number,        
    },
    data:()=>({
        number:0,                        
    }),
    watch:{
        value:function(newValue){
            gsap.to(this.$data,{duration: 0.5, number: newValue})
        }
    } 
}
</script>