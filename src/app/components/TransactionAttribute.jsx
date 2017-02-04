import React from "react";

export default class Attribute extends React.Component {
  render() {
    return (
      <li key={this.props.name}>{this.props.value}</li>
    );
  }
}

Attribute.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.any.isRequired
};
