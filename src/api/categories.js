import base from './base';

class categories {
  async getAll(){
    try {
      const response = await base.api.get("/categories");

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addCategory(data) {
    try {
      const response = await base.api.post("/categories", data);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async editCategory(id, data) {
    try {
      const response = await base.api.put(`/categories/${id}`, data);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteCategory(id) {
    try {
      const response = await base.api.delete(`/categories/${id}`);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

}

export default new categories();
