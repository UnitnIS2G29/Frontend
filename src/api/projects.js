import base from './base';

class projects {
  async getAll(){
    try {
      const response = await base.api.get("/projects");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTimers(id){
    try {
      const response = await base.api.get("/projects/"+id+"/timers");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default new projects();
