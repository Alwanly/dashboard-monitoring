<template>
  <div>
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-layout row wrap>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="blue"
          icon="groups"
          :value="totalUser"
          label="Total User"
        />
      </v-flex>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="green"
          icon="person"
          :value="totalUserActive"
          label="User Active"
        />
      </v-flex>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="red"
          icon="add_to_home_screen"
          :value="monthlyVisit"
          label="Monthly Visit"
        />
      </v-flex>
      <v-flex sm12 xs12 md3 lg3 xl3>
        <card-view
          color="blue"
          icon="payments"
          :value="totalTransaction"
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
                v-for="(m, index) in markers"
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
            :loading="chartDataMobileVersion == null"
            elevation="3"
            class="pa-4"
          >
            <line-chart
              v-if="chartDataMobileVersion"
              class="mb-3"
              :height="110"
              :data="chartDataMobileVersion"
              :options="optionsMobileVersion"
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
            :loading="chartdataUserType == null"
          >
            <v-container>
              <v-row>
                <v-col lg1 xl2 class="d-flex justify-center align-center">
                  <span
                    class="title"
                    v-if="
                      hasilIncrementNewUser != 'NaN' &&
                      hasilIncrementNewUser != 'Infinity'
                    "
                  >
                    +{{ hasilIncrementNewUser }}%</span
                  >
                </v-col>
                <v-col lg10 xl10>
                  <div style="position: relative; height: 230; width: 230px">
                    <pie-chart
                      v-if="chartdataUserType"
                      :data="chartdataUserType"
                      :options="optionsDonatUserType"
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
            :loading="chartdataMobileType == null"
          >
            <div style="position: relative; height: 230; width: 230px">
              <pie-chart
                v-if="chartdataMobileType"
                :data="chartdataMobileType"
                :options="optionsDonatMobileAppUsage"
                style=""
              />
            </div>
          </v-card>
        </v-container>
        <v-spacer></v-spacer>
        <v-container>
          <h2 class="subheading grey--text mb-4">Last Active</h2>
          <div
            v-for="item in tabledataLastActiveUser"
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
import axios from "axios";
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
  data() {
    return {
      map: null,
      loading: false,
      activitasUser: null,
      newUserThisMonth: 0,
      increaseMoney: 0,
      totalUser: 0,
      totalUserActive: 0,
      monthlyVisit: 0,
      totalTransaction: 0,
      marker: [],
      chartUserType: null,
      chartMobileType: null,
      chartMobileVersion: null,
      optionsMobileVersion: null,
      optionsDonatUserType: null,
      optionsDonatMobileAppUsage: null,
      refresh: this.$store.state.settings.refresh,
    };
  },
  computed: {
    itemCard: function () {
      return this.dataCard;
    },
    markers() {
      return this.marker;
    },
    chartdataUserType() {
      return this.chartUserType;
    },
    chartdataMobileType() {
      return this.chartMobileType;
    },
    tabledataLastActiveUser() {
      return this.activitasUser;
    },
    chartDataMobileVersion() {
      return this.chartMobileVersion;
    },
    hasilIncrementNewUser() {
      return this.incrementNewUser();
    },
  },
  methods: {
    getMobileAppVersion: function () {
      axios
        .get("users/mobile/app")
        .then((resp) => {
          this.chartMobileVersion = {
            labels: [
              "January",
              "February",
              "Maret",
              "April",
              "Mei",
              "Juni",
              "Juli",
              "Agustus",
              "September",
              "Oktober",
              "November",
              "Desember",
            ],
            datasets: resp.data.data,
          };
          this.optionsMobileVersion = {
            title: {
              display: true,
              text:
                "Mobile App Version Installed In " + new Date().getFullYear(),
              position: "top",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 1,
                    callback: function (value) {
                      if (value % 1 == 0) {
                        return value;
                      }
                    },
                  },
                },
              ],
            },
          };
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getActivitasUser: function () {
      axios
        .get("users/aktivitas")
        .then((resp) => {
          this.activitasUser = resp.data.data;
        })
        .catch((err) => console.log(err));
    },
    getCardData: function () {
      axios
        .all([
          axios.get("users/total"),
          axios.get("users/aktif"),
          axios.get("users/visitor"),
          axios.get("users/transaction"),
        ])
        .then(
          axios.spread((total, aktif, visitor, transaction) => {
            this.totalUser = total.data.total_user;
            this.totalUserActive = aktif.data.total_user_aktif;
            this.monthlyVisit = visitor.data.user_visit;
            this.totalTransaction = transaction.data.this_month_total;
          })
        )
        .catch((err) => {
          console.error(err);
        });
    },
    getUserLocation: function () {
      axios
        .get("users/location")
        .then((resp) => {
          this.marker = resp.data.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getUsertype: function () {
      axios
        .get("users/type")
        .then((resp) => {
          this.newUserThisMonth = resp.data.new_user;
          this.chartUserType = {
            labels: ["New User", "Existing User"],
            datasets: [
              {
                data: [resp.data.new_user, resp.data.exiting_user],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.2)",
                ],
              },
            ],
          };
          this.optionsDonatUserType = {
            legend: {
              position: "bottom",
            },
            plugins: {
              datalabels: {
                color: "#0f0f0f",
                textAlign: "center",
                font: {
                  weight: "bold",
                  size: 16,
                },
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += data;
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
              },
            },
            responsive: true,
            maintainAspectRatio: true,
          };
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getMobileType: function () {
      axios
        .get("users/mobile/usage")
        .then((resp) => {
          this.chartMobileType = {
            labels: [resp.data.data[0].os, resp.data.data[1].os],
            datasets: [
              {
                data: [
                  resp.data.data[0].total_user,
                  resp.data.data[1].total_user,
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.2)",
                ],
              },
            ],
          };
          this.optionsDonatMobileAppUsage = {
            legend: {
              position: "bottom",
            },
            plugins: {
              datalabels: {
                color: "#0f0f0f",
                textAlign: "center",
                font: {
                  weight: "bold",
                  size: 16,
                },
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += data;
                  });
                  let percentage = ((value * 100) / sum).toFixed(2) + "%";
                  return percentage;
                },
              },
            },
            responsive: true,
            maintainAspectRatio: true,
          };
        })
        .catch((err) => {
          console.error(err);
        });
    },
    runMethod: function () {
      const timer = setInterval(() => {
        this.getMobileType();
        this.getUsertype();
        this.getUserLocation();
        this.getCardData();
        this.getActivitasUser();
        this.getMobileAppVersion();
      }, this.refresh);
      this.$store.dispatch("settings/intervalIdAPI", timer);
    },
    moment(date) {
      return this.$moment(date).fromNow();
    },
    incrementNewUser() {
      let hasil = 0;
      hasil = ((this.newUserThisMonth * 100) / this.totalUser).toFixed(2);
      return hasil;
    },
  },
  mounted() {
    this.getMobileType();
    this.getUsertype();
    this.getUserLocation();
    this.getCardData();
    this.getActivitasUser();
    this.getMobileAppVersion();
    this.runMethod();
  },
};
</script>
<style scoped>
</style>