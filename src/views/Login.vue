<template>
  <v-container fill-height flud>
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="Email"
                  name="email"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="email"
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="password"
                />
              </v-form>
              <v-alert dismissible border="bottom" v-if="error" type="error">{{
                error
              }}</v-alert>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click.prevent="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import login from '../api/login';

export default {
  data: () => {
    return {
      email: null,
      password: null,
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await login.login({email: this.email, password: this.password});
        this.$router.push("/");
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style>

</style>
