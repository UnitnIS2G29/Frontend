import base from './base';

class requestTimeOff {

  async get(){
    try {
      const response = await base.api.get("/requestTimeOff");
      response.data.day
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getSelf(){
    try {
      const response = await base.api.get("/requestTimeOff/self");
      response.data.day
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addRequestTimeOff(data) {
    try {
      const response = await base.api.post("/requestTimeOff", data);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async approveRequestTimeOff(id, data) {
    try {
      const response = await base.api.put(`/requestTimeOff/${id}`, data);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new requestTimeOff();
