<template>
  <v-dialog v-model="status" persistent max-width="80vw">
    <v-card-title class="justify-end">
      <v-btn icon color="black" @click="status = !status">
        <v-icon>close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card>
      <GmapMap
        :center="{ lat: -6.1741, lng: 106.8296 }"
        :zoom="5"
        style="width: 100%; height: 350px"
      >
        <GmapCluster>
          <GmapMarker
            :key="index"
            v-for="(m, index) in dataClients"
            :position="m.position"
          />
        </GmapCluster>
      </GmapMap>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    status: Boolean,
    dataClients: Array,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
  }, 
};
</script>
