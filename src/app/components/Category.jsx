import React from "react";

const Category = ({name, subcategories, onClick}) => {
  const list = subcategories.map((subcategory) => {
    return <span key={subcategory} onClick={() => onClick()(`${name}:${subcategory}`)}>
      <h5>
        {subcategory}
      </h5>
    </span>;
  });
  return <div>
    <span>
      <h4>{name}</h4>
    </span>
    {list}
  </div>;
};

Category.propTypes = {
  name: React.PropTypes.string.isRequired,
  subcategories: React
    .PropTypes
    .arrayOf(React.PropTypes.string)
    .isRequired,
  onClick: React.PropTypes.func.isRequired
};

export default Category;
