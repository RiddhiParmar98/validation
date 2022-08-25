import React from "react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";
import Button from "./Button";

function File(props, ref) {
  const { label, name, value, handleClick, ...rest } = props
  return (
    <div className="mb-3 d-flex">
      <input {...{ name, id: name }} ref={ref} {...rest} />
      <Button
        type="button"
        className="btn btn-success mx-2 btn-md"
        name="Add More"
        handleOnClick={handleClick}
      />
      <ErrorMessage {...{ name }} component={TextError} />
    </div>
  );
}

export default React.forwardRef(File);
