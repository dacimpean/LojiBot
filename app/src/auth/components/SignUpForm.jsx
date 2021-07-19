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

export default function SignUpForm({ onSubmit, isCustomerAuthenticating }) {
  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string()
      .min(5, 'password must contain more than 5 characters')
      .required(),
    passwordConfirm: yup.string()
      .oneOf([yup.ref('password')], 'passwords should match')
      .required('please repeat your password'),
    keepSignedIn: yup.bool().required(),
  });
  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    keepSignedIn: false,
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        handleSubmit,
        isValid,
      }) => (
        <Fragment>
          <div className="d-flex pt-3 justify-content-center mb-4">
            <SignInWithIntuitButton />
          </div>
          <Divider text="or" />
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="userNameInput">
              Username
              </Label>
              <Field
                id="userNameInput"
                name="username"
                type="text"
                component={CustomInput}
                placeholder="john.smith"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="emailInput">
              Email address
              </Label>
              <Field
                type="email"
                id="emailInput"
                name="email"
                placeholder="john.smith@email.com"
                component={CustomInput}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="passwordInput">
              Password
              </Label>
              <Field
                type="password"
                id="passwordInput"
                name="password"
                placeholder="enter your password"
                component={CustomInput}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="passwordConfirmInput">
              Confirm Password
              </Label>
              <Field
                type="password"
                name="passwordConfirm"
                id="passwordConfirmInput"
                placeholder="repeat your password"
                component={CustomInput}
              />
            </FormGroup>
            <FormGroup check>
              <Field
                id="rememberInput"
                type="checkbox"
                name="keepSignedIn"
                className="form-check-input"
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
              ? (<Progress className="mt-3" animated value={100} />)
              : (
                <div className="d-flex justify-content-between mt-3">
                  <Link
                    to="/signin"
                    className="btn btn-outline-primary"
                  >
                I already have an account
                  </Link>
                  <Button
                    type="submit"
                    className="float-right"
                    color="primary"
                    disabled={!isValid}
                  >
                Sign Up
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

SignUpForm.propTypes = {
  isCustomerAuthenticating: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
