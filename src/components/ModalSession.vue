<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-title>Session Expired</v-card-title>
      <v-card-text> You have left this browser </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="logout">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    idleStatus: Boolean,
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
  watch: {
    idleStatus: function (value) {
      if (value) {
        this.dialog = value;
      }
    },
  },
};
</script>
