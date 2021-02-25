<template>
  <div>
    <h2 class="subheading grey--text">General</h2>
    <v-layout row wrap>
      <v-dialog v-model="showClientSpread" persistent max-width="80vw">
        <v-card-title class="justify-end">
          <v-btn
            icon
            color="black"
            @click="showClientSpread = !showClientSpread"
          >
            <v-icon>close</v-icon>
          </v-btn>
          {{ data }}
        </v-card-title>
        <v-card>
          <GmapMap
            :center="{ lat: -6.1741, lng: 106.8296 }"
            :zoom="5"
            ref="map"
            style="width: 100%; height: 350px"
            :options="{
              zoomControl: true,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: true,
              disableDefaultUi: false,
            }"
          >
            <GmapCluster>
              <GmapMarker
                :key="index"
                v-for="(m, index) in dataClientSpread"
                :position="m.position"
                :clickable="true"
                @click="openInfoWindowTemplate(m)"
              />
            </GmapCluster>

            <gmap-info-window
              :options="{ maxWidth: 300 }"
              :position="infoWindow.position"
              :opened="infoWindow.open"
              @closeclick="infoWindow.open = false"
            >
              <div v-html="infoWindow.template"></div>
            </gmap-info-window>
          </GmapMap>
        </v-card>
      </v-dialog>
      <v-flex sm6 xs6 md3 lg3 xl3 class="ma-4">
        <v-card class="mb-4">
          <v-list-item-content class="text-left ml-3 mr-3">
            <v-list-item-title class="mb-4 text-h5 font-weight-bold blue--text">
              {{ formatNumber(displayTotalUsers) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-h6 font-weight-bold">
              Total User
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon x-small color="gray" v-bind="attrs" v-on="on">
                    info
                  </v-icon>
                </template>
                <span>Total users didapat dari banyak users</span>
              </v-tooltip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-card>
        <v-card class="mb-4">
          <v-list-item-content class="text-left ml-3 mr-3">
            <v-list-item-title class="mb-4 text-h5 font-weight-bold blue--text">
              {{ formatNumber(displayActiveUsers) }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-h6 font-weight-bold">
              Active Users
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon x-small color="gray" v-bind="attrs" v-on="on">
                    info
                  </v-icon>
                </template>
                <span>Total users didapat dari banyak users</span>
              </v-tooltip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-card>
      </v-flex>
      <!-- Consumtive users -->
      <v-flex sm6 xs6 md3 lg4 xl4 class="ma-4">
        <v-card class="mb-4">
          <v-card-title class="card-title-border">
            Consumtive Users
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon x-small color="gray" v-bind="attrs" v-on="on">
                  info
                </v-icon>
              </template>
              <span>Total users didapat dari banyak users</span>
            </v-tooltip>
          </v-card-title>
          <v-layout column style="height: 50vh" class="pa-4">
            <v-flex class="card-overflow">
              <v-data-table
                v-if="displayConsumtiveUsers"
                :headers="consumtiveHeaders"
                :items="displayConsumtiveUsers"
                :items-per-page="10"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr :class="{ 'yellow accent-2': index == 0 }">
                    <td>{{ ++index }}</td>
                    <td>
                      <v-icon small v-if="index == 1"> star </v-icon>
                      {{ item.name }}
                    </td>
                    <td>{{ item.total_orders }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <!-- Agents -->
      <v-flex sm6 xs6 md3 lg4 xl4 class="ma-4">
        <v-card class="mb-4">
          <v-card-title class="card-title-border">
            Agents
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon x-small color="gray" v-bind="attrs" v-on="on">
                  info
                </v-icon>
              </template>
              <span>Total users didapat dari banyak users</span>
            </v-tooltip>
          </v-card-title>
          <v-layout column style="height: 50vh" class="pa-4">
            <v-flex class="card-overflow">
              <v-data-table
                v-if="displayAgents"
                :headers="agentsHeadres"
                :items="displayAgents"
                :items-per-page="10"
                hide-default-footer
              >
                <template v-slot:item="{ item, index }">
                  <tr>
                    <td>{{ ++index }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.clients_total }}</td>
                    <td>
                      <v-btn
                        icon
                        color="green"
                        @click="getAgentsClientSpread(item.clients_spread)"
                      >
                        <v-icon>explore</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </template>
                <template v-slot:top="{ pagination, options, updateOptions }">
                  <v-data-footer
                    :pagination="pagination"
                    :options="options"
                    @update:options="updateOptions"
                    items-per-page-text="$vuetify.dataTable.itemsPerPageText"
                  />
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { numberFormatComma } from "../plugins/script";
// import ModalMaps from "@/components/ModalMaps";
export default {
  name: "Users",
  data() {
    return {
      map: null,
      infoWindow: {
        position: { lat: 0, lng: 0 },
        open: false,
        template: "",
      },
      showClientSpread: false,
      dataClientSpread: null,
      consumtiveHeaders: [
        {
          text: "No",
          sortable: false,
        },
        {
          text: "Name",
          value: "name",
          sortable: false,
        },
        {
          text: "Total Orders",
          value: "total_orders",
          sortable: false,
        },
      ],
      agentsHeadres: [
        {
          text: "No",
          sortable: false,
        },
        {
          text: "Name",
          value: "name",
          sortable: false,
        },
        {
          text: "Total Clients",
          value: "clients_total",
          sortable: false,
        },
        {
          text: "Action",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    async openInfoWindowTemplate(item) {
      await this.getAddressFromLatlng(item);
      this.infoWindow.position = item.position;
      this.infoWindow.open = true;
    },
    formatNumber: function (num) {
      return numberFormatComma(num);
    },
    fetchAll() {
      this.$store.dispatch("users/fetchGeneralUsers");
    },
    getAgentsClientSpread: function (clients) {
      console.log(clients);
      this.showClientSpread = true;
      this.dataClientSpread = clients;
    },
    getAddressFromLatlng(clients) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clients.position.lat},${clients.position.lng}&sensor=false&key=${process.env.VUE_APP_GOOGLE_API}`
      )
        .then((respon) => respon.json())
        .then((dataJson) => {
          const address = dataJson["results"][0]["formatted_address"];
          const name = clients.name;
          this.infoWindow.template = `Name:   ${name}<br>Address: ${address}`;
        });
    },
  },
  mounted() {
    this.fetchAll();
  },
  computed: {
    displayTotalUsers() {
      return this.$store.getters["users/getGeneral"].total_users;
    },
    displayActiveUsers() {
      return this.$store.getters["users/getGeneral"].active_users;
    },
    displayConsumtiveUsers() {
      return this.$store.getters["users/getGeneral"].consumtive_users;
    },
    displayAgents() {
      return this.$store.getters["users/getGeneral"].agents;
    },
  },
};
</script>
<style scoped>
.card-title-border {
  border-bottom: 1px solid green;
}
.card-overflow {
  overflow: auto;
}
/* Hide scrollbar for Chrome, Safari and Opera
.card-overflow::-webkit-scrollbar {
  display: none;
} */

/* Hide scrollbar for IE, Edge and Firefox
.card-overflow {
  -ms-overflow-style: none; /* IE and Edge */
/* scrollbar-width: none; /* Firefox */
/* } */
</style>