import axios from "axios";
import api from "./api-proxy";
import store from "./store";
import {
  findUncategorizedTransactions
} from "./actions";

const menuOptions = [{
  name: "Import",
  handleClick: async(userId, password) => {
    const url = await api.getUrl();
    await axios.post(`${url}/checkingaccount/states/imported`, {
      userId,
      password
    });
    store.dispatch(findUncategorizedTransactions());
  }
}, {
  name: "Import 2",
  handleClick: (userId, password) => {
    console.log(userId, password);
  }
}];

export default menuOptions;
