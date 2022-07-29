import React from "react";

const Label = ({ htmlFor, id, value }) => {
  return (
    <label htmlFor={htmlFor} id={id}>
      {value}
    </label>
  );
};

export default Label;
