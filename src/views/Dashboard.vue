<template>
  <div>    
    <h2 class="subheading grey--text">Users Summary </h2>
    <v-layout row wrap>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="blue"
          icon="groups"
          :value="displayTotalUser"
          label="Total User"
        />
      </v-flex>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="green"
          icon="person"
          :value="displayUsersActive"
          label="User Active"
        />
      </v-flex>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="red"
          icon="add_to_home_screen"
          :value="displayMonthlyVisit"
          label="Monthly Visit"
        />
      </v-flex>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="blue"
          icon="payments"
          :value="displayMonthlyTransaction"
          label="Monthly Transaction"
          :currency="true"
        />
      </v-flex>
    </v-layout>
    <v-layout row align-content-space-around>
      <v-flex lg8 xl8>
        <v-container>
          <h2 class="subheading grey--text mb-4">Users location</h2>
          <GmapMap
            :center="{ lat: -6.1741, lng: 106.8296 }"
            :zoom="5"
            style="width: 100%; height: 350px"
          >
            <GmapCluster>
              <GmapMarker
                :key="index"
                v-for="(m, index) in displayUsersLocation"
                :position="m.position"
              />
            </GmapCluster>
          </GmapMap>
        </v-container>
        <v-container>
          <h2 class="subheading grey--text mb-4">
            Mobile App Version Installed In
          </h2>
          <v-card
            :loading="dataChartMobileAppVer.datas == null"
            elevation="3"
            class="pa-4"
          >
            <line-chart
              v-if="dataChartMobileAppVer.datas"
              class="mb-3"
              :height="110"
              :data="dataChartMobileAppVer.datas"
              :options="dataChartMobileAppVer.options"
            ></line-chart>
          </v-card>
        </v-container>
      </v-flex>
      <v-flex lg4 xl4>
        <v-container>
          <h2 class="subheading grey--text">Users Type</h2>
          <v-card
            elevation="3"
            class="rounded-lg pa-4 mt-4"
            :loading="dataChartUsersType.datas == null"
          >
            <v-container>
              <v-row>
                <v-col lg1 xl2 class="d-flex justify-center align-center">
                  <span class="title" v-if="dataChartUsersType.datas">
                    +{{ displayPrecentaceNewUser }}%</span
                  >
                </v-col>
                <v-col lg10 xl10>
                  <div style="position: relative; height: 230; width: 230px">
                    <pie-chart
                      v-if="dataChartUsersType.datas"
                      :data="dataChartUsersType.datas"
                      :options="dataChartUsersType.options"
                    />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
        <v-spacer></v-spacer>
        <v-container>
          <h2 class="subheading grey--text">Mobile App Usage</h2>
          <v-card
            elevation="3"
            class="rounded-lg pa-4 mt-4 d-flex justify-center"
            :loading="dataChartMobileType.datas == null"
          >
            <div style="position: relative; height: 230; width: 230px">
              <pie-chart
                v-if="dataChartMobileType.datas"
                :data="dataChartMobileType.datas"
                :options="dataChartMobileType.options"
                style=""
              />
            </div>
          </v-card>
        </v-container>
        <v-spacer></v-spacer>
        <v-container>
          <h2 class="subheading grey--text mb-4">Last Active</h2>
          <div
            v-for="item in displayLastActiveUsers"
            v-bind:key="item.created_at"
          >
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar size="70">
                  <v-icon size="65">account_circle</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{
                    item.user.display_name
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-1">
                    From {{ item.lokasi }}</v-list-item-subtitle
                  >
                  <v-list-item-subtitle class="text-right">{{
                    moment(item.created_at)
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import LineChart from "../plugins/LineChart.js";
import PieChart from "../plugins/PieChart.js";
import CardView from "@/components/CardView";
export default {
  name: "Home",
  components: {
    LineChart,
    PieChart,
    CardView,
  },
  methods: {
    fetchAll() {
      this.$store.dispatch("dashboard/fetchTotalUsers");
      this.$store.dispatch("dashboard/fetchUsersActive");
      this.$store.dispatch("dashboard/fetchMonthlyVisit");
      this.$store.dispatch("dashboard/fetchMonthlyTransaction");
      this.$store.dispatch("dashboard/fetchUsersLocation");
      this.$store.dispatch("dashboard/fetchMobileAppVersion");
      this.$store.dispatch("dashboard/fetchLastActiveUsers");
      this.$store.dispatch("dashboard/fetchUsersType");
      this.$store.dispatch("dashboard/fetchMobileType");
    },
    autoRefresh() {
      const setTime = setInterval(() => {
        this.fetchAll();
      }, this.$store.getters["settings/getRefresh"]);
      this.$store.dispatch("settings/intervalIdAPI", setTime);
    },
    moment(date) {
      return this.$moment(date).fromNow();
    },
  },
  mounted() {
    this.fetchAll();
    this.autoRefresh();
  },
  computed: {
    displayTotalUser() {      
      return this.$store.getters["dashboard/getTotalUsers"];
    },
    displayUsersActive() {
      return this.$store.getters["dashboard/getUsersActive"];
    },
    displayMonthlyVisit() {
      return this.$store.getters["dashboard/getMonthlyVisit"];
    },
    displayMonthlyTransaction() {
      return this.$store.getters["dashboard/getMonthlyTransaction"];
    },
    displayUsersLocation() {
      return this.$store.getters["dashboard/getUsersLocation"];
    },
    dataChartMobileAppVer() {
      return this.$store.getters["dashboard/getChartMobileAppVersion"];
    },
    dataChartUsersType() {
      return this.$store.getters["dashboard/getChartUsersType"];
    },
    dataChartMobileType() {
      return this.$store.getters["dashboard/getChartMobileType"];
    },
    displayLastActiveUsers() {
      return this.$store.getters["dashboard/getLastActiveUsers"];
    },
    displayPrecentaceNewUser() {
      let hasil = 0;
      let new_users = this.$store.getters["dashboard/getNewUsersThisMonth"];
      let total_users = this.$store.getters["dashboard/getTotalUsers"];
      hasil = ((new_users * 100) / total_users).toFixed(2);
      return hasil;
    },
  },
};
</script>
<style scoped>
</style>