import React from "react";

const Image = ({src,alt}) => {
  return <div className="mb-3">
    <img {...{src,alt}} />
  </div>;
};

export default Image;
