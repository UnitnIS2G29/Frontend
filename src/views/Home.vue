<template>
  <v-container>
    <v-row v-if="loading">
      <v-progress-circular indeterminate/>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card>
          <v-col cols="4">
            <v-card-title>Check In</v-card-title>
          </v-col>
          <v-col cols="4">
            <v-card-text>{{date}}</v-card-text>
          </v-col>
          <v-col cols="1">
            <v-btn color="green" dark @click="checkInHandler()">Check In</v-btn>
          </v-col>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card title="Le tue categorie">
          <v-card-title>I tuoi reparti</v-card-title>
          <v-col cols="12" v-for="department in self_departments" :key="department._id">
            <v-card-text>
              {{department.name}}
            </v-card-text>
          </v-col>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
// @ is an alias to /src
import check_in from '../api/check-in';
import departments from '../api/departments.js';

export default {
  name: 'Home',
  data: () => ({
    loading: false,
    check_in: false,
    self_departments: null,
    date: null
  }),
  async mounted() {
    this.loading = true
    this.self_departments = await departments.getSelf()
    this.loading = false
  },
  methods: {
    checkInHandler: async function() {
      console.log("Button Pressed")
      this.date = await check_in.get()
    }
  }

}
</script>
