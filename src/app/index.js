// This file is just for testing. Luca/application will consume the App via the library exported.
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {App, className} from "./App";

import serviceRegistry from "luca-service-registry-library";

const categoriesApi = {
  client: axios,
  getUrl: () => {
    return serviceRegistry.locate("categories-api")
      .then(url => {
        return `${url}/api/categories`;
      });
  }
};

const element = document.getElementById("app");
element.className = className;
ReactDOM.render(
  <App categoriesApi={categoriesApi}/>, element);
