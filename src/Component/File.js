import React from "react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";

function File({ label, name, value, ...rest }) {
  return (
    <div className="mb-3">
      <input {...{ name, id: name }} {...rest} />
      <ErrorMessage {...{ name }} component={TextError} />
    </div>
  );
}

export default File;
