import base from './base';

class departments {
    async getAll(){
        try {
            const response = await base.api.get("/departments");

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async addDepartment(data) {
        try {
            const response = await base.api.post("/departments", data);

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async editDepartment(id, data) {
        try {
            const response = await base.api.put(`/departments/${id}`, data);

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async deleteDepartment(id) {
        try {
            const response = await base.api.delete(`/departments/${id}`);

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

}

export default new departments();
