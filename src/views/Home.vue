<template>
  <v-container>
    <v-row v-if="loading">
      <v-progress-circular indeterminate/>
    </v-row>
    <v-row v-else>
      <v-col cols="4">
        <h1 class="display-1">Check In</h1>
      </v-col>
      <v-col cols="4">
        <h5 class="display-1">{{date}}</h5>
      </v-col>
      <v-col cols="1">
        <v-btn color="green" dark @click="checkInHandler()">Check In</v-btn>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
// @ is an alias to /src
import check_in from '../api/check-in';

export default {
  name: 'Home',
  data: () => ({
    loading: false,
    check_in: false,
    date: null
  }),
  methods: {
    checkInHandler: async function() {
      console.log("Button Pressed")
      this.date = await check_in.get()
    }
  }

}
</script>
