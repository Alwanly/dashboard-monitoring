<template>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
    >
        <v-card>
            <v-card-title>Session Expired</v-card-title>
            <v-card-text>
                You have left this browser for {{timeIdle(time)}}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                color="success"
                @click="logout"                
                >Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>    
</template>

<script>
export default {
    props:{
        idleStatus:Boolean        
    },
    data(){
        return {
            dialog:false,
            time:this.$store.getters.getRefresh,
            refreshOpt:this.$store.getters.optionRefresh
        }
    },
    methods:{
        timeIdle:function(time){
            let getminute = this.refreshOpt.find(arr => arr.value == time)                                    
            return getminute.label
        },
         logout:function(){
                this.$store.dispatch('logout')
                .then(()=>{
                    this.$router.push('/login')
                })          
        },
    },
    watch:{
        idleStatus:function(value){
            if(value){
                this.dialog = value
            }
        }        
    }
}
</script>
