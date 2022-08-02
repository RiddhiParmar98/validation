import React from "react";

const Image = ({ src, alt, ...rest }) => {
  return <img {...{ src, alt }} {...rest} />;
};

export default Image;
