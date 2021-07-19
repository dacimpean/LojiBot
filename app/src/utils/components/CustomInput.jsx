import React, { Fragment } from 'react';
import { Input, FormFeedback } from 'reactstrap';

export default function CustomInput({
  field, form: { touched, errors }, withoutValidation, ...props
}) {
  if (withoutValidation) {
    return (
      <Fragment>
        <Input
          {...field}
          {...props}
        />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Input
        {...field}
        {...props}
        valid={!!(touched[field.name] && !errors[field.name])}
        invalid={!!(touched[field.name] && errors[field.name])}
      />
      <FormFeedback>{errors[field.name]}</FormFeedback>
    </Fragment>
  );
}
