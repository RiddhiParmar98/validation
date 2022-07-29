import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";


function Checkbox(props) {
  const { name, options, ...rest } = props;

  return (
    <div className="mb-3">
      <Field {...{ name, id: name }} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />{" "}
                &nbsp;
                <label htmlFor={option.value}> {option.key}&nbsp;</label>
                <br />
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage {...{ name }} component={TextError} />
    </div>
  );
}

export default Checkbox;
