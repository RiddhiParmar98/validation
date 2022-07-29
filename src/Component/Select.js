import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="mb-3">
      <Field as="select" {...{ name, id: name }} {...rest} multiple={true}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage {...{ name }} component={TextError} />
    </div>
  );
}

export default Select;
