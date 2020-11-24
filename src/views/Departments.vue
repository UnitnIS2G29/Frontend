<template>
  <v-container>
    <v-row v-if="loading">
      <v-progress-circular indeterminate/>
    </v-row>
    <v-row v-else>
      <v-col cols="8">
        <h1 class="display-1">Departments</h1>
      </v-col>
      <v-col cols="4">
        <v-btn color="green" dark @click="editCat = true">Aggiungi Reparto</v-btn>
      </v-col>
      <v-col cols="12" v-for="department in department_cards" :key="department._id">
        <v-card dep>
          <v-row align="center" no-gutters>
            <v-col cols="9">
              <v-card-title>{{department.name}}</v-card-title>
            </v-col>
            <v-col cols="1" v-if="department.expanded === false">
              <v-card-actions><v-btn icon @click.stop="department.expanded = true" ><v-icon>mdi-chevron-down</v-icon></v-btn></v-card-actions>
            </v-col>
            <v-col cols="1" v-else>
              <v-card-actions><v-btn icon @click.stop="department.expanded = false" ><v-icon>mdi-chevron-up</v-icon></v-btn></v-card-actions>
            </v-col>
            <v-col cols="1">
              <v-card-actions><v-btn icon @click.stop="editdepartmentHandler(department)" ><v-icon>mdi-dots-vertical</v-icon></v-btn></v-card-actions>
            </v-col>
            <v-col cols="1">
              <v-card-actions><v-btn icon color="red" @click.stop="deltedepartmentHandler(department)" ><v-icon>mdi-delete</v-icon></v-btn></v-card-actions>
            </v-col>
          </v-row>
          <v-col v-if="department.expanded">
            <v-row>
              <v-col>
                <v-btn @click="1 == 1">Aggiungi utente</v-btn>
              </v-col>
            </v-row>
            <v-card user>
              <v-row cols="12" v-for="user in department.employees" :key="user._id">
                <v-col cols="10">
                  <v-card-title>{{user._id}}</v-card-title>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="editCat">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Nome Dipartimento" v-model="catName"></v-text-field>
                <v-textarea label="Descrizione Dipartimento" v-model="catDesc"></v-textarea>
                <v-btn @click="save">Salva</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import departments from '../api/departments.js';
//import users from '../api/login.js';

export default {
  name: "departments",
  data: () => ({
    loading: false,
    editCat: false,
    editing: false,
    departments: null,
    department_cards: [],
    catName: null,
    catDesc: null,
    catId: null,
    users: null
  }),
  async mounted() {
    this.loading = true;
    this.departments = await departments.getAll();
    this.departments.forEach((item) => {
      this.department_cards.push({...item, 'expanded': false})
    })
    this.loading = false;

  },
  methods: {
    save: async function() {
      if(this.catName && this.catDesc && !this.editing) {
        const department =  await departments.addDepartment({name: this.catName, description: this.catDesc});
        this.departments.push(department);
        this.catName = this.catDesc = null;
      }

      if(this.editing) {
        try {
          await departments.editDepartment(this.catId, {name: this.catName, description: this.catDesc});
          let index = this.departments.findIndex(el => el._id == this.catId);
          this.departments[index] = {...this.departments[index], name: this.catName, description: this.catDesc};
        } catch(e) {
          console.log(e);
        }
        this.editing = false;
        this.catName = this.catDesc = this.catId = null;
      }

      this.editCat = false;
    },

    editdepartmentHandler: function(cat) {
      this.editCat = true;
      this.editing = true;
      this.catName = cat.name;
      this.catDesc = cat.description;
      this.catId = cat._id;
    },

    deltedepartmentHandler: async function(cat) {
      try {
        await departments.deletedepartment(cat._id);
        this.departments = this.departments.filter(el => el._id !== cat._id);

      } catch(e) {
        console.log(e);
      }
    }
  }

}
</script>

<style>

</style>
