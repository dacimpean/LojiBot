import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Card, Row, Col, CardBody, CardHeader,
} from 'reactstrap';

import { SignInForm } from '../components';
import { authenticateCustomer } from '../../store/auth/authActions';

export class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: false,
      redirect: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ username, password, keepSignedIn }) {
    const { signIn } = this.props;

    this.setState({ isAuthenticating: true }, () => {
      signIn({ username, password }, keepSignedIn)
        .then(() => {
          this.setState({ isAuthenticating: false, redirect: true });
        })
        .catch((error) => {
          console.log(error); // @TODO display error message
          this.setState({ isAuthenticating: false });
        });
    });
  }

  render() {
    const { isAuthenticating, redirect } = this.state;
    const { from } = this.props;

    if (redirect) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <section className="d-flex flex-grow-1 flex-column align-items-center justify-content-center">
        <div className="container">
          <Row noGutters>
            <Col
              md={{
                size: 8,
                offset: 2,
              }}
              lg={{
                size: 6,
                offset: 3,
              }}
            >
              <h1 className="text-center mb-3">Loji</h1>
              <Card className="border-0 shadow-z4">
                <CardHeader className="bg-primary p-1" />
                <CardBody>
                  <SignInForm
                    onSubmit={this.onSubmit}
                    isCustomerAuthenticating={isAuthenticating}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    );
  }
}

const mapActionsToProps = (dispatch) => ({
  signIn: (credentials, isKeepingSignedIn) => dispatch(authenticateCustomer(credentials, isKeepingSignedIn)),
});

export default connect(null, mapActionsToProps)(SignIn);

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  from: PropTypes.string,
};

SignIn.defaultProps = {
  from: '/',
};
