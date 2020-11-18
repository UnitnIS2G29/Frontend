<template>
  <v-container>
    <v-row v-if="loading">
      <v-progress-circular indeterminate/>
    </v-row>
    <v-row v-else>
      <v-col cols="8">
        <h1 class="display-1">Categorie</h1>
      </v-col>
      <v-col cols="4">
        <v-btn color="green" dark @click="editCat = true">Aggiungi Categoria</v-btn>
      </v-col>
      <v-col cols="12" v-for="category in categories" :key="category._id" @click="editCategoryHandler(category)">
        <v-card>
          <v-row align="center" no-gutters>
            <v-col cols="11">
              <v-card-title>{{category.name}}</v-card-title>
            </v-col>
            <v-col cols="1">
              <v-card-actions><v-btn icon color="red" @click.stop="delteCategoryHandler(category)" ><v-icon>mdi-delete</v-icon></v-btn></v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="editCat">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Nome Categoria" v-model="catName"></v-text-field>
                <v-textarea label="Descrizione Categoria" v-model="catDesc"></v-textarea>
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
import categories from '../api/categories';

export default {
  name: "Categories",
  data: () => ({
    loading: false,
    editCat: false,
    editing: false,
    categories: null,
    catName: null,
    catDesc: null,
    catId: null,
  }),
  async mounted() {
    this.loading = true;
    this.categories = await categories.getAll();
    this.loading = false;

  },
  methods: {
    save: async function() {
      if(this.catName && this.catDesc && !this.editing) {
        const category =  await categories.addCategory({name: this.catName, description: this.catDesc});
        this.categories.push(category);
        this.catName = this.catDesc = null;
      }

      if(this.editing) {
        try {
          await categories.editCategory(this.catId, {name: this.catName, description: this.catDesc});
          let index = this.categories.findIndex(el => el._id == this.catId);
          this.categories[index] = {...this.categories[index], name: this.catName, description: this.catDesc};
        } catch(e) {
          console.log(e);
        }
        this.editing = false;
        this.catName = this.catDesc = this.catId = null;
      }

      this.editCat = false;
    },

    editCategoryHandler: function(cat) {
      this.editCat = true;
      this.editing = true;
      this.catName = cat.name;
      this.catDesc = cat.description;
      this.catId = cat._id;
    },

    delteCategoryHandler: async function(cat) {
      try {
        await categories.deleteCategory(cat._id);
        this.categories = this.categories.filter(el => el._id !== cat._id);

      } catch(e) {
        console.log(e);
      }
    }
  }

}
</script>

<style>

</style>
