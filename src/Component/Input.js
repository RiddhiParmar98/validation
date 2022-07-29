import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function input({ label, name, ...rest }) {
  return (
    <div className="mb-5">
      <Field {...{ name, id: name }} {...rest} />
      <ErrorMessage {...{ name }} component={TextError} />
    </div>
  );
}

export default input;
