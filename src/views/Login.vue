<template>
  <v-app id="login-home" dark>  
      <v-container
        fill-height
        fluid>
        <v-layout
          align-center
          justify-center>          
          <v-flex
            xs12
            sm8
            md4>
            <v-card
              :loading="loading"
              class="elevation-12">
              <v-toolbar
                color="general">
                <v-toolbar-title>Admin Panel</v-toolbar-title>
                <v-spacer/>
              </v-toolbar>
              <v-card-text>
                <v-form >
                  <v-text-field
                    ref="username"
                    v-model="username"
                    :rules="[() => !!username || 'This field is required']"
                    prepend-icon="mdi-account"
                    label="Login"
                    placeholder="Email or Phone"
                    required
                  />
                  <v-text-field
                    ref="password"
                    v-model="password"
                    :rules="[() => !!password || 'This field is required']"
                    :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    prepend-icon="mdi-lock"
                    label="Password"
                    placeholder="*********"
                    counter
                    required
                    @keydown.enter="login"
                    @click:append="showPassword = !showPassword"
                  />
                </v-form>
              </v-card-text>
              <v-divider class="mt-5"/>
              <v-card-actions>
                <v-spacer/>
                <v-btn @click="login">Login
                </v-btn>
              </v-card-actions>
              <v-snackbar
                v-model="snackbar"
                :color="color"
                :top="true"
              >
                {{ errorMessages }}
                <v-btn
                  dark
                  text
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </v-snackbar>
            </v-card>
          </v-flex>
        </v-layout>

      </v-container>    
  </v-app>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: '',
      errorMessages: 'Incorrect login info',
      snackbar: false,
      color: 'general',
      showPassword: false,
      loading: false
    }
  },
  // Sends action to Vuex that will log you in and redirect to the dash otherwise, error
  methods: {
    login: function () {
      let login = this.username
      let password = this.password  
      this.loading = true    
      this.$store.dispatch('login', { login, password })
        .then(() =>{
          this.$router.push('/')
          this.loading = false
        } )
        .catch(err => {
          console.log(err)
          this.snackbar = true
          this.loading = false
        }
        )
    }
  },
  metaInfo () {
    return {
      title: 'Super Secret | Login'
    }
  }
}
</script>