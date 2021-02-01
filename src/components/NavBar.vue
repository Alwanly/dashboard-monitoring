<template>
    <nav>
        <v-app-bar light app color="green">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer">

            </v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase">
                <span class="font-weight-light">TOKOHAJI</span>
                <span>Dashboard</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>            
            <v-btn text @click="logout" > 
                <span>EXIT</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" darp app class="yellow draken-4">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <v-img src="/img1.png"></v-img>
                    </v-avatar>
                    <p class="subheading mt-1 text-center">{{username}}</p>
                </v-flex>
            </v-layout>
            <v-list text>
                <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
                    <v-list-item-action>
                        <v-icon>{{link.icon}}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{link.text}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {      
    data: ()=>({
        drawer:true,
        links:[
            {icon:'dashboard',text:'Dashboard',route:'/'},
            {icon:'folder',text:'Trends',route:'/trends'},
        ],
        username:null,
    }),      
    methods:{
        logout:function(){
                this.$store.dispatch('logout')
                .then(()=>{
                    this.$router.push('/login')
                })          
        },
        getUser:function (){
            this.username = sessionStorage.getItem('user')
        }   
    },
    mounted(){
        this.getUser()
    }
}
</script>
<style scoped>
.border{
    border-left: 4px solid #0ba518;
}
</style>