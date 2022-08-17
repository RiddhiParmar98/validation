import React from "react";

const Button = ({ className, type, name, handleOnClick,...rest }) => {
  return (
    <button {...{ className, type, name, onClick: handleOnClick,...rest }}>
      {name}
    </button>
  );
};
export default Button;
