<template>
  <div>
    <h1 class="subheading grey--text">Settings</h1>
    <v-container elevation-4 class="rounded-lg">
      <v-snackbar v-model="snackbar" :color="color" :top="true">
        {{ message }}
        <v-btn dark text @click="snackbar = false"> Close </v-btn>
      </v-snackbar>
      <v-simple-table>
        <thead>
          <tr>
            <th class="text-h6">Name</th>
            <th class="text-h6">Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="d-flex align-start pa-3">
              <span class="text-body-1"
                >Pengaturan untuk mengatur interval request API</span
              >
            </td>
            <td class="pa-3">
              <v-radio-group v-model="getOptRefresh" :mandatory="true">
                <v-radio value="180000" label="3 Menit (default)"></v-radio>
                <v-radio value="300000" label="4 Menit"></v-radio>
                <v-radio value="420000" label="7 Menit"></v-radio>
              </v-radio-group>
              <v-btn
                elevation="2"
                color="success"
                depressed
                @click="saveRefreshTime"
                >Save</v-btn
              >
            </td>
          </tr>
          <!-- <tr>
            <td class="d-flex align-start pa-3"> 
              <span class="text-body-1">Logout setelah diam dalam yang jangka waktu  </span>
              </td>              
            <td class="pa-3" >                              
              <v-radio-group  v-model="getIdleTime" :mandatory="true">    
                  <v-radio value="120000" label="2 Menit (default)"></v-radio>
                  <v-radio value="180000" label="3 Menit"></v-radio>
                  <v-radio value="300000" label="5 Menit"></v-radio>
              </v-radio-group>
              <v-btn elevation="2" color="success" depressed @click="saveIdleTime">Save</v-btn>   
            </td>
          </tr> -->
        </tbody>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      getOptRefresh: this.$store.state.settings.refresh,
      // getIdleTime:this.$store.state.settings.idle,
      loading: false,
      snackbar: false,
      message: "",
      color: "",
    };
  },
  methods: {
    saveRefreshTime: function () {
      let refreshTime = this.getOptRefresh;
      this.loading = true;
      this.$store
        .dispatch("settings/saveRefreshTime", refreshTime)
        .then(() => {
          this.loading = false;
          this.message = "Berhasil Disimpan";
          this.color = "success";
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
          this.message = "Gagal Disimpan";
          this.color = "error";
          this.snackbar = true;
        });
    },
    // saveIdleTime:function(){
    //   let time = this.getIdleTime
    //   this.loading = true
    //   this.$store.dispatch('settings/saveIdleTime',time)
    //      .then(()=>{
    //     this.loading = false
    //     this.message = "Berhasil Disimpan"
    //     this.color= "success"
    //     this.snackbar = true
    //   })
    //   .catch(err=>{
    //     console.log(err)
    //     this.loading = false
    //     this.message = "Gagal Disimpan"
    //     this.color= "error"
    //     this.snackbar = true
    //   })
    // }
  },
};
</script>
