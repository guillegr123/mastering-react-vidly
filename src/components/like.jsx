import React from "react";

const Like = props => {
  const classes = `fa fa-heart${props.value ? "" : "-o"}`;
  return (
    <i
      className={classes}
      aria-hidden="true"
      onClick={() => props.onToggle(!props.value)}
    />
  );
};

export default Like;
