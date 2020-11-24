<template>
  <v-app>
    <v-navigation-drawer permanent floating v-model="drawer" v-if="!($route.name == 'Login')" app>
      <!--  -->
      <v-list>
        <v-list-item v-for="[link, text] in links" :to="{name: link}" :key="link" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
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
export default {
  name: "App",

  data: () => ({
    links: [
      ['Categories', 'Categorie'],
      ['Timers', 'Timer'],
      ['RequestTimeOff', 'Richieste'],
      ['AcceptRequestTimeOff', 'Approva Richieste'],
    ]
  })
};
</script>
