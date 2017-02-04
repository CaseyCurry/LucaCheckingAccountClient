import React from "react";
import {Provider} from "react-redux";
import GroupsContainer from "./components/containers/GroupsContainer";
import store from "./store";
import {findUncategorizedTransactions, findCategories} from "./actions";
import menuOptions from "./menu-options";
import "./styles/main";

export const App = ({categoriesApi}) => {
  store.dispatch(findUncategorizedTransactions());
  store.dispatch(findCategories(categoriesApi));
  return <Provider store={store}>
    <GroupsContainer/>
  </Provider>;
};

App.propTypes = {
  categoriesApi: React.PropTypes.object.isRequired
};

export const className = "container checking-account";

export {menuOptions};
