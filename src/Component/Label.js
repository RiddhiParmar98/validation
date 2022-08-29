import React from "react";

const Label = ({ htmlFor, id, value }) => {
  return <label className="text-md my-2 font-bold text-gray-700 block" {...{ htmlFor, id }}>{value}</label>;
};

export default Label;
