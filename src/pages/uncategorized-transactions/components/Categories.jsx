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
            {this.props.categories.map(category => {
              return (
                <li key={category.name}>
                  <div
                    onClick={e => {
                      if (this.props.categories) {
                        this.props.onSelectCategory(category.name);
                        e.stopPropagation();
                      }
                    }}
                  >
                    {category.name}
                  </div>
                  {category.name === this.props.selectedCategory && (
                    <ul className="subcategories">
                      {category.subcategories.map(subcategory => {
                        const displayLoader =
                          this.props.areTransactionsBeingCategorized &&
                          this.props.selectedCategory === category.name &&
                          this.props.selectedSubcategory === subcategory.id;
                        return (
                          <li key={subcategory.id}>
                            {displayLoader && (
                              <div>
                                <span>{subcategory.name}</span>
                                <div className="icon-loader">
                                  <Loader />
                                </div>
                              </div>
                            )}
                            {!displayLoader && (
                              <span
                                onClick={e => {
                                  if (this.props.categories) {
                                    this.props.onSelectSubcategory(
                                      subcategory.id
                                    );
                                    e.stopPropagation();
                                  }
                                }}
                              >
                                {subcategory.name}
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
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  selectedSubcategory: PropTypes.string,
  areTransactionsBeingCategorized: PropTypes.bool.isRequired,
  onCategorize: PropTypes.func.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  onSelectSubcategory: PropTypes.func.isRequired,
  onHideCategories: PropTypes.func.isRequired
};

export default Categories;
