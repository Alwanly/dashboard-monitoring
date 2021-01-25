<template>
    <v-app>
      <Navbar/>      
      <v-main class="ma-4">              
          <v-slide-x-transition mode="out" hide-on-leave="true">
            <router-view></router-view>                              
            </v-slide-x-transition>
        </v-main>          
        <Footer/>
    </v-app>    
</template>

<script>

import Navbar from '@/components/NavBar'
import Footer from '@/components/Footer'
export default {
  name:'App',
  components:{
    Navbar,
    Footer
  }
}
</script>

<style lang="scss">

</style>
