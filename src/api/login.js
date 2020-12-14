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
      sessionStorage.setItem("user-role", response.data.user.role);
      sessionStorage.setItem("user-id", response.data.user._id);
      base.setAuth(response.data.token);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async logout() {
    try {
      const response = await base.api.delete("/authentications");
      if(response.data == "Ok") {
        sessionStorage.removeItem("user-token");
        sessionStorage.removeItem("user-role");
        sessionStorage.removeItem("user-id");
      } else {
        console.log("Errore logout");
      }
    } catch (e) {
      throw new Error(e);
    }
  }

}

export default new login();
