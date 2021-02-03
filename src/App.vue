<template>  
    <v-expand-transition mode="in-out">
      <router-view></router-view>        
    </v-expand-transition>    
</template>

<script>
export default {
  name:'App',
  watch:{
    session:function(){
    console.log(this.$store.state.status)
    if(this.$store.state.status){
       this.$axios.defaults.headers.common['Authorization'] = this.$store.state.token  
    }else{
      sessionStorage.setItem('status',false)
      this.$router.push("/login");
    }
  }  
  }
}
</script>

<style lang="scss">

</style>
