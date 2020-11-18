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

}

export default api;
