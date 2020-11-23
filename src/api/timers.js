import base from './base';

class timers {

  async getList(){
    try {
      const response = await base.api.get("/timers");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  
  async createTimer(timer){
    try {
      const response = await base.api.post("/timers",{
          ...timer
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getSelf(){
    try {
      const response = await base.api.get("/timers/self");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async stopSelf(){
    try {
      const response = await base.api.patch("/timers/self");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async editSelf(data){
    try {
      const response = await base.api.put("/timers/self",{
          ...data
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteSelf(){
    try {
      const response = await base.api.delete("/timers/self");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async postSelf(data){
    try {
      const response = await base.api.post("/timers/self",{
          ...data
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async get(id){
    try {
      const response = await base.api.get("/timers/"+id);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async edit(id,data){
    try {
      const response = await base.api.put("/timers/"+id,{
          ...data
      });
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id){
    try {
      const response = await base.api.delete("/timers/"+id);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

}

export default new timers();
