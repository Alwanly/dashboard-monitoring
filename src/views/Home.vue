<template>
  <v-app>
    <Navbar />
    <ModalIdle :idleStatus="idle" />
    <v-main class="ma-4">
      <v-slide-x-transition mode="out-in">
        <router-view></router-view>
      </v-slide-x-transition>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
import ModalIdle from "@/components/ModalSession";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Navbar,
    ModalIdle,
    Footer,
  },
  computed: {
    idle: function () {
      return this.$store.state.idleVue.isIdle;
    },
  },
};
</script>
<style lang="scss">
</style>
