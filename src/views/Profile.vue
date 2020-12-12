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
                <v-card-title>Cambia Password: DA IMPLEMENTARE</v-card-title>
              </v-col>              
            </v-row>
          </v-card>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>
<script>
import users from "../api/users";

export default {
  name: "Profile",
  data: () => ({
      user: null
  }),
  async mounted() {
    this.user = await users.getUser(sessionStorage.getItem("user-id"));
  }
};
</script>

<style></style>
