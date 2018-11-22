import React from 'react';

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";

  return (
    <li
      className={classes}
      aria-hidden="true"
      style={{ cursor: 'pointer' }}
      onClick={props.onClick}></li>
  );
};

export default Like;