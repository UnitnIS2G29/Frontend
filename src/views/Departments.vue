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
                <v-btn @click.stop="adduserHandler(department)">Aggiungi utente</v-btn>
              </v-col>
            </v-row>
            <v-card user>
              <v-row cols="12" v-for="user in department.employees" :key="user._id">
                <v-col cols="10">
                  <v-card-title>{{get_name_of_user(user._id)}}</v-card-title>
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
    <v-dialog v-model="addUser">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <h1>Not Implemented</h1>
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
import users from '../api/users.js';

export default {
  name: "departments",
  data: () => ({
    loading: false,
    editCat: false,
    addUser: false,
    editUser: false,
    editing: false,
    departments: null,
    department_cards: [],
    catName: null,
    catDesc: null,
    depId: null,
    users: null
  }),
  async mounted() {
    this.loading = true;
    this.departments = await departments.getAll();
    this.departments.forEach((item) => {
      this.department_cards.push({...item, 'expanded': false})
    })
    this.loading = false;
    this.users = await users.getAll();

  },
  methods: {
    save: async function() {
      if(this.catName && this.catDesc && !this.editing) {
        const department =  await departments.addDepartment({name: this.catName, description: this.catDesc});
        this.departments.push(department);
        this.department_cards.push({...department, 'expanded': false})
        this.catName = this.catDesc = null;
      }

      if(this.editing) {
        try {
          await departments.editDepartment(this.depId, {name: this.catName, description: this.catDesc});
          let index = this.departments.findIndex(el => el._id == this.depId);
          this.departments[index] = {...this.departments[index], name: this.catName, description: this.catDesc};
        } catch(e) {
          console.log(e);
        }
        this.editing = false;
        this.catName = this.catDesc = this.depId = null;
      }

      this.editCat = false;
    },

    saveUser: async function() {
      if(this.catName && this.catDesc && !this.editing) {
        const department =  await departments.addDepartment({name: this.catName, description: this.catDesc});
        this.departments.push(department);
        this.depId = null;
      }

      if(this.editing) {
        try {
          await departments.editDepartment(this.depId, {name: this.catName, description: this.catDesc});
          let index = this.departments.findIndex(el => el._id == this.depId);
          this.departments[index] = {...this.departments[index], name: this.catName, description: this.catDesc};
        } catch(e) {
          console.log(e);
        }
        this.editing = false;
        this.catName = this.catDesc = this.depId = null;
      }

      this.editCat = false;
    },

    editdepartmentHandler: function(cat) {
      this.editCat = true;
      this.editing = true;
      this.catName = cat.name;
      this.catDesc = cat.description;
      this.depId = cat._id;
    },

    adduserHandler: function (dep) {
      this.addUser = true;
      this.depId = dep._id
    },

    deltedepartmentHandler: async function(cat) {
      try {
        await departments.deleteDepartment(cat._id);
        this.departments = this.departments.filter(el => el._id !== cat._id);
        this.department_cards = this.department_cards.filter(el => el._id !== cat._id);

      } catch(e) {
        console.log(e);
      }
    },
    get_name_of_user: function (id) {
      let name
      this.users.forEach((item) => {
        if (item._id == id) {
          console.log(item)
          name = item.name + ", " + item.email
        }
      });
      return name
    }
  }

}
</script>

<style>

</style>
