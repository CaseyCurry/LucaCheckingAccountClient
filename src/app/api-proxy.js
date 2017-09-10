import axios from "axios";

const api = (resource) => {
  return {
    client: axios,
    getUrl: () => {
      return `http://192.168.56.110/api/${resource}`;
    }
  };
};

export default api;
