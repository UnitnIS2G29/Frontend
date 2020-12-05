<template>
  <v-container>
    <v-row>
      <v-col cols="8">
        <h1 class="display-1" v-if="personalView">Turni Personali</h1>
        <h1 class="display-1" v-else>Turni Dipartimento</h1>
      </v-col>
      <v-col cols="4">
        <v-btn v-if="personalView" @click="personalView=false" >
          Turni Dipartimento
        </v-btn>
        <v-btn v-else @click="personalView=true"> 
          Turni Personali
        </v-btn>
      </v-col>

      <v-container v-if="personalView">
        <v-col cols="12" v-for="shift in shiftsPersonal" :key="shift._id">
          <v-card>
            <v-row align="center" no-gutters>
              <v-col cols="3">
              </v-col>
              <v-col cols="3">
                <v-card-title>{{ day(shift.day) }}</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ time(shift.timeBegin) }} -
                  {{ time(shift.timeEnd) }}
                </v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ shift.category.name }}
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-container>

      <v-container v-else>
        <v-col cols="12" v-for="shift in shiftsDepartment" :key="shift._id">
          <v-card>
            <v-row align="center" no-gutters>
              <v-col cols="3">
                <v-card-title>{{ shift.user.name }}</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>{{ day(shift.day) }}</v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ time(shift.timeBegin) }} -
                  {{ time(shift.timeEnd) }}
                </v-card-title>
              </v-col>
              <v-col cols="3">
                <v-card-title>
                  {{ shift.category.name }}
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
import shifts from "../api/shifts";
import moment from "moment";

export default {
  name: "shift",
  data: () => ({
    loading: false,
    personalView: true,
    shiftsPersonal: null,
    shiftsDepartment: null
  }),
  async mounted() {
    this.loading = true;
    this.shiftsPersonal = await shifts.getSelf();
    this.shiftsDepartment = await shifts.getSelfDepartment();
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
  },
};
</script>

<style></style>
