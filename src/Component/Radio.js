import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function Radio(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="mb-3">
      <Field {...{ name, id: name }} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />{" "}
                &nbsp;
                <label style={{ fontWeight: "normal" }} htmlFor={option.value}>
                  {" "}
                  {option.key}&nbsp;
                </label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage {...{ name }} component={TextError} />
    </div>
  );
}

export default Radio;
