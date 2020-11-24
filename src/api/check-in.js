import base from './base';

class checkIn {
    async get(){
        try {
            const response = await base.api.get("/check-in");
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new checkIn();