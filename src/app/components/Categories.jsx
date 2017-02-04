import React from "react";
import Category from "./Category";

const Categories = ({categories, handlers}) => {
  const list = Object
    .keys(categories)
    .map((category) => {
      return <Category
        key={category}
        name={category}
        subcategories={categories[category]}
        onClick={() => handlers.onCategoryClick(category)}/>;
    });
  return <ul className="list-unstyled categories">{list}</ul>;
};

Categories.propTypes = {
  categories: React.PropTypes.object.isRequired,
  handlers: React
    .PropTypes
    .shape({onCategoryClick: React.PropTypes.func.isRequired})
    .isRequired
};

export default Categories;
