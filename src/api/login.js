import base from './base';

class login {
  constructor() {
  }

  async login(data){
    try {
      console.log(data);
      const response = await base.api.post("/authentications", data);

      console.log(response.data);
      sessionStorage.setItem("user-token", response.data.token);
      base.setAuth(response.data.token);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

}

export default new login();
