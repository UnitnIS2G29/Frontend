import axios from "axios";

class api {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.VUE_APP_BACKEND,
      headers: {
        common: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`
        }
      }
    });
  }

  setAuth(token) {
    console.log(this.api.defaults);
    this.api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

}

export default new api();
