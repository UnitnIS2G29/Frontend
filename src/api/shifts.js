import base from './base';

class shifts {

  async getSelf(){
    try {
      const response = await base.api.get("/shifts/self");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getSelfDepartment(){
    try {
      const response = await base.api.get("/shifts/self/department");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }  

}

export default new shifts();
