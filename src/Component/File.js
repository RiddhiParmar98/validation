import React from "react";


function File(props, ref) {
  const { label, name, value, handleClick, ...rest } = props
  return (
    <div className="flex">
      <input {...{ name, id: name }} ref={ref} {...rest} />
     
    </div>
  );
  
}

export default React.forwardRef(File);
