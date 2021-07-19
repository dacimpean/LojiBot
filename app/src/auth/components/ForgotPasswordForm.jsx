import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Form, FormGroup, Label, FormText, Button,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { CustomInput } from '../../utils';

export default function ForgotPasswordForm({ onSubmit }) {
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });
  const initialValues = {
    email: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleSubmit,
        isValid,
      }) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="forgotPasswordInput">
              Email address
            </Label>
            <Field
              name="email"
              type="email"
              className="form-control"
              id="forgotPasswordInput"
              placeholder="enter your email address"
              component={CustomInput}
            />
            <FormText className="text-muted text-center">
              We will send you a link to reset your password
            </FormText>
          </FormGroup>
          <div className="d-flex justify-content-between">
            <Link to="/signin" className="btn btn-outline-primary">Back to login</Link>
            <Button type="submit" color="primary" disabled={!isValid}>Reset Password</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

ForgotPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
