import api from './base';

class login extends api {
  constructor() {
    super();
  }

  setAuth(token) {
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  async login(data){
    try {
      console.log(data);
      const response = await this.api.post("/login", data);

      console.log(response.data);
      sessionStorage.setItem("user-token", response.data.token);
      this.setAuth(response.data.token);

      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  }

}

export default new login();
