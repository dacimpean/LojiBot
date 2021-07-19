import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Button, Spinner,
} from 'reactstrap';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import { CustomInput } from '../../utils';

export default function InviteTeamMemberForm({ onSubmit, isMemberAdding }) {
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
      {({ handleSubmit, isValid }) => (
        <Form onSubmit={handleSubmit} inline className="d-inline-flex align-items-start">
          <FormGroup className="d-flex flex-column flex-nowrap mr-2">
            <Field
              type="email"
              name="email"
              placeholder="Email address"
              bsSize="sm"
              withoutValidation
              component={CustomInput}
            />
          </FormGroup>
          <Button
            size="sm"
            type="submit"
            color="primary"
            disabled={!isValid}
          >
            {isMemberAdding
              ? <Spinner className="mr-1" size="sm" color="light" />
              : null
            }
            Add Team Member
          </Button>
        </Form>
      )}
    </Formik>
  );
}

InviteTeamMemberForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isMemberAdding: PropTypes.bool.isRequired,
};
