import {connect} from "react-redux";
import Categories from "../Categories";

const mapStateToProps = (state) => {
  const categories = state.categories;
  return {categories};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handlers: {
      onCategoryClick: ownProps.onCategoryClick
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
