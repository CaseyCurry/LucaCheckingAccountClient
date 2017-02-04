import React from "react";
import CategorizeButton from "./CategorizeButton";
import CategoriesContainer from "./containers/CategoriesContainer";

const CategoryPullout = ({phrase, isOut, handlers}) => {
  const onClick = () => handlers.onCategorizeClick(phrase);
  return <div
    className={isOut
    ? "category-pullout-out"
    : "category-pullout-in"}>
    <CategorizeButton onClick={onClick}/> {isOut && <CategoriesContainer
      onCategoryClick={() => handlers.onCategoryClick(phrase)}/>}
  </div>;
};

CategoryPullout.propTypes = {
  phrase: React.PropTypes.string.isRequired,
  isOut: React.PropTypes.bool.isRequired,
  handlers: React
    .PropTypes
    .shape({onCategorizeClick: React.PropTypes.func.isRequired, onCategoryClick: React.PropTypes.func.isRequired})
    .isRequired
};

export default CategoryPullout;
