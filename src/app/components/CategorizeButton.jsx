import React from "react";

const CategorizeButton = ({onClick}) => {
  return <span className="categorize-button" onClick={onClick}>categorize</span>;
};

CategorizeButton.propTypes = {
  onClick: React.PropTypes.func.isRequired
};

export default CategorizeButton;
