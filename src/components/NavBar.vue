<template>
  <nav>
    <v-app-bar app color="green darken-3" class="white--text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text">
      </v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span>{{pageTitle}}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">
        <span class="white--text">EXIT</span>
        <v-icon right color="#fff">exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app color="#333">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <v-img src="/img1.png"></v-img>
          </v-avatar>
          <p class="subheading mt-1 text-center white--text">{{ user }}</p>
        </v-flex>
      </v-layout>
      <v-divider light></v-divider>
      <v-list-group
        active-class="border"
        color="#fff"
        :value="true"
        prepend-icon="dashboard"
        router
        to="/"
      >
        <template v-slot:activator>
          <v-list-item-title class="white--text">Home</v-list-item-title>
        </template>
        <v-list-item
          v-for="link in linksMainMenu"
          :key="link.text"
          router
          :to="link.route"
          active-class="border-sub"
          color="#fff"
        >
          <v-list-item-action class="ml-4">
            <v-icon color="#fff">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-divider></v-divider>
      <v-list text>
        <v-list-item
          v-for="link in linksSetting"
          :key="link.text"
          router
          :to="link.route"
          active-class="border"
          color="#fff"
        >
          <v-list-item-action>
            <v-icon color="#fff">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              link.text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    linksMainMenu: [
      {
        icon: "home",
        text: "Dashboard",
        route: "/",
      },
      {
        icon:"person",
        text:"users",
        route:"/users"
      }
    ],
    linksSetting: [{ icon: "settings", text: "Setting", route: "/settings" }],
    username: null,
  }),
  computed: {
    user: function () {
      return this.$store.state.auth.userProfile;
    },
    pageTitle:function(){           
      return this.$store.getters["dashboard/getTitlePage"];
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
.border-sub {
  border-left: 4px solid #0fc7df;
}
</style>