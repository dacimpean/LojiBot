import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class OAuth extends Component {
  state = {
    hasValidationBeenFailed: false,
    redirect: false,
  };

  componentDidMount() {
    const { validateToken, location } = this.props;

    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access');
    const refreshToken = params.get('refresh');

    validateToken(accessToken, refreshToken)
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(() => {
        this.setState({ hasValidationBeenFailed: true });
      });
  }

  render() {
    const { hasValidationBeenFailed, redirect } = this.state;

    if (hasValidationBeenFailed) {
      return (<Redirect to="/signin" />);
    }

    if (redirect) {
      return (<Redirect to="/" />);
    }

    return (
      <section className="d-flex flex-column flex-grow-1 align-items-center justify-content-center">
        <div className="px-4 py-3 shadow-z3 rounded">
          <h5 className="text-center px-5">Verifying your token...</h5>
          <Progress animated value={100} />
        </div>
      </section>
    );
  }
}

OAuth.propTypes = {
  validateToken: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
