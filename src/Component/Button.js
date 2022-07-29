import React from "react";

const Button = ({ className, type, name, handleOnClick }) => {
  return (
    <button {...{ className, type, name, onClick: handleOnClick }}>
      {name}
    </button>
  );
};
export default Button;
