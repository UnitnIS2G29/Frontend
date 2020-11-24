import base from './base';

class users {
    async getAll(){
        try {
            const response = await base.api.get("/users");

            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

}

export default new users();
