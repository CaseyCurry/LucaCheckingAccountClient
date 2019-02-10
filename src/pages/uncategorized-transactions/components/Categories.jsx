import React from "react";
import PropTypes from "prop-types";
import Loader from "../../../controls/Loader";

class Categories extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="categories dialog">
        <div>
          <button
            disabled={
              !this.props.selectedCategory && !this.props.selectedSubcategory
            }
            onClick={e => {
              this.props.onCategorize();
              e.stopPropagation();
            }}
          >
            categorize
          </button>
          <button
            onClick={e => {
              this.props.onHideCategories();
              e.stopPropagation();
            }}
          >
            close
          </button>
          <ul>
            {Object.keys(this.props.categories).map(category => {
              const subcategories = this.props.categories[category];
              return (
                <li key={category}>
                  <div
                    onClick={e => {
                      if (this.props.categories) {
                        this.props.onSelectCategory(category);
                        e.stopPropagation();
                      }
                    }}
                  >
                    {category}
                  </div>
                  {category === this.props.selectedCategory && (
                    <ul className="subcategories">
                      {subcategories.map(subcategory => {
                        const displayLoader =
                          this.props.areTransactionsBeingCategorized &&
                          this.props.selectedCategory === category &&
                          this.props.selectedSubcategory === subcategory;
                        return (
                          <li key={subcategory}>
                            {displayLoader && (
                              <div>
                                <span>{subcategory}</span>
                                <div className="icon-loader">
                                  <Loader />
                                </div>
                              </div>
                            )}
                            {!displayLoader && (
                              <span
                                onClick={e => {
                                  if (this.props.categories) {
                                    this.props.onSelectSubcategory(subcategory);
                                    e.stopPropagation();
                                  }
                                }}
                              >
                                {subcategory}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.object.isRequired,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  areTransactionsBeingCategorized: PropTypes.bool.isRequired,
  onCategorize: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onSelectSubcategory: PropTypes.func.isRequired,
  onHideCategories: PropTypes.func.isRequired
};

export default Categories;
