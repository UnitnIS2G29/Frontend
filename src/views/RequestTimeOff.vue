<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-1">Richieste</h1>
      </v-col>
      <v-col cols="4">
        <v-btn color="green" dark @click="createReq = true"
          >Nuova Richiesta</v-btn
        >
      </v-col>
      <v-container>
        <v-col cols="12" v-for="request in requestTimeOff" :key="request._id">
          <v-card>
            <v-row align="center" no-gutters>
              <v-col cols="3">
                <v-card-title>{{ day(request.day) }}</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ time(request.timeBegin) }} -
                  {{ time(request.timeEnd) }}
                </v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ category(request.category) }}
                </v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ status(request) }}
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-container>
    </v-row>

    <v-dialog v-model="createReq">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-date-picker v-model="reqDay" :min="today"></v-date-picker>
              </v-col>
              <v-col>
                <v-time-picker format="24hr" v-model="reqBegin"></v-time-picker>
              </v-col>
              <v-col>
                <v-time-picker format="24hr" v-model="reqEnd"></v-time-picker>
              </v-col>
            </v-row>
            <v-textarea label="Motivazione:" v-model="reqReason"></v-textarea>
            <v-radio-group
              mandatory
              label="Motivo della richiesta"
              v-model="reqCat">
              <v-radio label="Ferie"> </v-radio>
              <v-radio label="Malattia"> </v-radio>
            </v-radio-group>
            <v-btn @click="save">Salva</v-btn>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import requestTimeOff from "../api/requestTimeOff";
import moment from "moment";

export default {
  name: "requestTimeOff",
  data: () => ({
    loading: false,
    requestTimeOff: null,
    createReq: false,
    reqDay: null,
    reqBegin: null,
    reqEnd: null,
    reqReason: null,
    reqCat: null,

    today: new Date().toISOString().slice(0,10),

  }),
  async mounted() {
    this.loading = true;
    this.requestTimeOff = await requestTimeOff.getSelf();
    this.loading = false;
  },
  methods: {
    day(date) {
      if (date) {
        return moment(String(date)).format("DD/MM/YYYY");
      }
    },
    time(date) {
      if (date) {
        return moment(String(date)).format("HH:mm");
      }
    },
    category(value) {
      if (value) {
        if (value == "illness") {
          return "Malattia";
        } else return "Ferie";
      }
    },
    status(request) {
      if (!request.reviewed) {
        return "In review";
      } else {
        if (request.accepted) return "Approvata";
        else if (!request.accepted) return "Rifiutata";
      }
    },
    cat(radio) {
      if (radio == 0) return "vacation";
      else return "illness";
    },
    save: async function() {
      const request = await requestTimeOff.addRequestTimeOff({
        day: this.reqDay + "T" + this.reqBegin + ":00Z",
        timeBegin: this.reqDay + "T" + this.reqBegin + ":00Z",
        timeEnd: this.reqDay + "T" + this.reqEnd + ":00Z",
        reason: this.reqReason,
        category: this.cat(this.reqCat),
      });
      this.requestTimeOff.push(request);
      this.reqDay = this.reqBegin = this.reqEnd = this.reqReason = this.reqCat = null;

      this.createReq = false;
    },
  },
};
</script>

<style></style>
