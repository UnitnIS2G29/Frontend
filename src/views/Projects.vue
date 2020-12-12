<template>
  <v-container>
    <v-row v-if="loading">
      <v-progress-circular indeterminate />
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <h1 class="display-1">Progetti</h1>
      </v-col>
      <v-col
        cols="12"
        v-for="project in projects"
        :key="project._id"
        @click="showProjectTimers(project)"
      >
        <v-card link>
          <v-row align="center" no-gutters>
            <v-col cols="8">
              <v-card-title>{{ project.name }}</v-card-title>
              <v-card-text>{{ project.description }}</v-card-text>
            </v-col>
            <v-col cols="4">
              <v-card-text>
                <b>Tempo Totale:</b> {{ timeHuman(project.total_time) }}
                <br /><b>Inizio Tracking:</b>
                {{
                  project.first_entry
                    ? moment(project.first_entry).format("YYYY-MM-DD HH:mm")
                    : "Non ancora iniziato"
                }}
                <br /><b>Ultimo Tracking:</b>
                {{
                  project.last_entry
                    ? moment(project.last_entry).format("YYYY-MM-DD HH:mm")
                    : "Non ancora iniziato"
                }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-if="showingProject" v-model="showingProject">
      <v-card>
        <v-card-title>Attività Progetto {{showingProject.name}}</v-card-title>
        <v-card-text>{{showingProject.description}}</v-card-text>
        <v-card-text>
          <v-container>
              <v-row>
                  <v-col cols="3"><b>INIZIO TRACKING</b></v-col>
                  <v-col cols="3"><b>FINE TRACKING</b></v-col>
                  <v-col cols="6"><b>UTENTE (EMAIL)</b></v-col>
              </v-row>
            <v-row v-for="timer in showingProjectTimers" :key="timer._id"> 
                <v-col
                  cols="3"
                >
                    {{
                        timer.started_at
                        ? moment(timer.started_at).format("YYYY-MM-DD HH:mm")
                        : ""
                    }}
                </v-col>
                <v-col
                  cols="3"
                >
                   {{
                        timer.stopped_at
                        ? moment(timer.stopped_at).format("YYYY-MM-DD HH:mm")
                        : ""
                    }}
                </v-col>
                <v-col cols="6">
                    <b>{{
                        timer.user
                        ? parsedUsers[timer.user].name
                        : ""
                    }}</b>
                    ({{
                        timer.user
                        ? parsedUsers[timer.user].email
                        : ""
                    }})
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import projects from "../api/projects";
import users from "../api/users";

export default {
  name: "Projects",
  data: () => ({
    loading: false,
    projects: null,
    showingProject: null,
    showingProjectTimers: [],
    parsedUsers: []
  }),
  async mounted() {
    this.loading = true;
    this.projects = await projects.getAll();
    const ulist = await users.getAll();
    
    for(let user of ulist){
        this.parsedUsers[user._id] = user;
    }
    
    this.loading = false;
  },
  methods: {
    showProjectTimers: async function (project) {
        this.loading = true;
        this.showingProject = project;
        this.showingProjectTimers = await projects.getTimers(project.id);
        this.loading = false;
    },

    timeHuman: function (project) {
      var ms = project * 1000;
      var d = this.moment.duration(ms);
      return Math.floor(d.asHours()) + this.moment(ms).format(":mm:ss");
    },
  },
};
</script>

<style>
</style>
