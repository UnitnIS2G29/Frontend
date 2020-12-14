<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Profilo</h1>
      </v-col>
      <v-container>
        <v-col cols="5">
          <v-card>
            <v-row align="center" no-gutters>
              <v-col>
                <v-card-title>Nome: {{ user.name }}</v-card-title>
                <v-card-title>E-mail: {{ user.email }}</v-card-title>
                <v-card-title><v-btn @click="passChange = true">Cambia Password</v-btn></v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-container>
    </v-row>
    <v-dialog v-model="passChange">
      <v-card>
        <v-row justify="center">
          <v-col cols="12">
            <v-card-title>Cambia Password</v-card-title>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="password"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn @click="changePassw">Invia</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import users from "../api/users";
import login from "../api/login";

export default {
  name: "Profile",
  data: () => ({
      user: null,
    passChange: false,
    password: ""
  }),
  async mounted() {
    this.user = await users.getUser(sessionStorage.getItem("user-id"));
  },
  methods: {
    async changePassw() {
      console.log("Changing Password")
      await users.changePassw(this.password);
      console.log("Password Changed")
      this.password = "";
      await login.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style></style>
