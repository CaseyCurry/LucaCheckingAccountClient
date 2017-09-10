// This file is just for testing. Luca/application will consume the App via the library exported.
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  App,
  className
} from "./App";

const categoriesApi = {
  client: axios,
  getUrl: () => {
    return new Promise((resolve) => {
      resolve("http://192.168.56.110/api/categories");
    });
  }
};

const element = document.getElementById("app");
element.className = className;
ReactDOM.render(
  <App categoriesApi = {
    categoriesApi
  }/>, element);
