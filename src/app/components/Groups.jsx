import React from "react";
import Group from "./Group";

const Groups = ({groups, handlers}) => {
  const list = groups.map((group) => {
    return <Group key={group.phrase} group={group} handlers={handlers}/>;
  });
  return <ul className="list-unstyled col-sm-12">
    {list}
  </ul>;
};

Groups.propTypes = {
  groups: React
    .PropTypes
    .arrayOf(React.PropTypes.object)
    .isRequired,
  handlers: React.PropTypes.object.isRequired
};

export default Groups;
