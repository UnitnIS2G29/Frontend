<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Approva richieste</h1>
      </v-col>
      <v-container>
        <v-col
          cols="12"
          v-for="request in requestTimeOff"
          :key="request._id"
        >
          <v-card>
            <v-row align="center" no-gutters>
              <v-col cols="2">
                <v-card-title>{{ request.user.name }}</v-card-title>
              </v-col>
              <v-col cols="2">
                <v-card-title>{{ day(request.day) }}</v-card-title>
              </v-col>
              <v-col cols="2">
                <v-card-title>
                    {{ time(request.timeBegin) }} - {{ time(request.timeEnd) }}
                </v-card-title>
              </v-col>
              <v-col cols="2">
                <v-card-title>
                    {{category(request.category)}}
                </v-card-title>
              </v-col>
              <v-col cols="4" v-if="!request.reviewed">
                <v-btn
                color="green"
                elevation="5"
                outlined
                rounded
                @click="approve(request, 1)"                
                >
                Approva
                </v-btn>
                <v-btn
                color="red"
                elevation="5"
                outlined
                rounded
                @click="approve(request, 0)"
                >
                Rifiuta
                </v-btn>
              </v-col>
              <v-col cols="4" v-else>
                <v-card-title>
                  {{ status(request) }}
                </v-card-title>
              </v-col>              
            </v-row>
          </v-card>
        </v-col>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import requestTimeOff from "../api/requestTimeOff";
import moment from "moment";

export default {
  name: "requestTimeOff",
  data: () => ({
    requestTimeOff: null,
  }),
  async mounted() {
    this.requestTimeOff = await requestTimeOff.get();
  },
  methods: {
    day(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY");
      }
    },
    time(value) {
      if (value) {
        return moment(String(value)).format("HH:mm");
      }
    },
    category(value) {
      if (value) {
          if (value=='illness') {return 'Malattia'}
          else return 'Ferie';
      }
    },
    reviewed(value) {
      if (value) {
        if (value==1) {return 'Approvata'}
        else if (value==0) {return 'Rifiutata'}
        else return 'In review';
      }  
    },
    status(requestTimeOff) {
      if (!requestTimeOff.reviewed) {
        return "In review";
      }else{
        if (requestTimeOff.accepted) return "Approvata"
        else if (!requestTimeOff.accepted) return "Rifiutata"}
    },
    approve: async function(req, decision) {
      try {
        await requestTimeOff.approveRequestTimeOff(req._id, {"reviewed": 1, "accepted": decision});
        this.requestTimeOff = await requestTimeOff.get();
      } catch(e) {
        console.log(e);
      }      
    }
  }
};
</script>

<style></style>
