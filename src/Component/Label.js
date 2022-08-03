import React from "react";

const Label = ({ htmlFor, id, value }) => {
  return <label {...{ htmlFor, id }}>{value}</label>;
};

export default Label;
