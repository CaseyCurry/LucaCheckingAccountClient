import axios from "axios";

const api = (resource) => {
  return {
    client: axios,
    getUrl: () => {
      return new Promise((resolve) => {
        resolve(`http://192.168.56.110/api/${resource}`);
      });
    }
  };
};

export default api;
