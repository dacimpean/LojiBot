import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Form, FormGroup, Label, Button, Progress,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { CustomInput, Divider } from '../../utils';
import SignInWithIntuitButton from './SignInWithIntuitButton';

export default function SignInForm({ onSubmit, isCustomerAuthenticating }) {
  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    keepSignedIn: yup.bool().required(),
  });
  const initialValues = {
    username: '',
    password: '',
    keepSignedIn: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, isValid }) => (
        <Fragment>
          <div className="d-flex pt-3 justify-content-center mb-4">
            <SignInWithIntuitButton />
          </div>
          <Divider text="or" />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="loginInput">
              Username
              </Label>
              <Field
                type="text"
                name="username"
                id="loginInput"
                placeholder="john.smith"
                component={CustomInput}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="passwordInput">
              Password
              </Label>
              <Field
                name="password"
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="enter your password"
                component={CustomInput}
              />
              <Link
                to="/forgot-password"
                className="small float-right"
              >
              forgot password?
              </Link>
            </FormGroup>
            <FormGroup check>
              <Field
                name="keepSignedIn"
                type="checkbox"
                className="form-check-input"
                id="rememberInput"
                component={CustomInput}
                withoutValidation
              />
              <Label
                htmlFor="rememberInput"
                className="form-check-label"
              >
              Keep me signed in
              </Label>
            </FormGroup>
            { isCustomerAuthenticating
              ? (
                <Progress className="mt-3" animated value={100} />
              )
              : (
                <div className="d-flex justify-content-between mt-3">
                  <Link
                    to="/signup"
                    className="btn btn-outline-primary"
                  >
                Create new account
                  </Link>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={!isValid}
                  >
                Sign In
                  </Button>
                </div>
              )
            }
          </Form>
        </Fragment>
      )}
    </Formik>
  );
}

SignInForm.propTypes = {
  isCustomerAuthenticating: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
