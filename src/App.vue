<template>
  <v-app>
    <v-navigation-drawer permanent floating v-if="!($route.name == 'Login')" app>
      <!--  -->
      <v-list>
        <v-list-item v-for="[link, text] in allowedLinks()" :to="{name: link}" :key="link" link>
          <v-list-item-content>
            <v-list-item-title >{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-spacer/>
        <v-list-item color="red" @click="logout">
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import login from './api/login';

export default {
  name: "App",

  data: () => ({
    links: [
      //link, text, roleLevel
      ['Home','Home', 0],
      ['Categories', 'Categorie',  1],
      ['Projects', 'Progetti', 1],
      ['Shifts','Turni', 0],
      ['Departments', 'Reparti', 1],
      ['Timers', 'Timer', 0],
      ['RequestTimeOff', 'Richieste', 0],
      ['AcceptRequestTimeOff', 'Approva Richieste', 1],
      ['Profile','Profilo', 0]
    ],
    role: null,
  }),
  methods: {
    roleLevel(role) {
      switch (role) {
        case "employee":
          this.role = 0;
          break;
        case "supervisor":
          this.role = 1;
          break;
        case "admin":
          this.role = 2;
          break;
        default:
          this.role = 0;
      }
    },
    allowedLinks: function() {
      this.roleLevel(sessionStorage.getItem("user-role"));
      return this.links.filter( (link) => {
        if (link[2]<=this.role){
          return link;
        }
      });
    },
    async logout() {
      await login.logout();
      this.$router.push('/login');
    }
  }
};
</script>
