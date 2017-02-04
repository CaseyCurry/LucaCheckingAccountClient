import axios from "axios";
import serviceRegistry from "luca-service-registry-library";

const api = (resource) => {
  return {
    client: axios,
    getUrl: () => {
      return serviceRegistry.locate("checking-account-api")
        .then(url => {
          return `${url}/api/${resource}`;
        });
    }
  };
};

export default api;
