import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import DevelopmentRouter from './development/DevelopmentRouter';
import DashboardRouter from './dashboard/DashboardRouter';
import PurchaseOrdersRouter from './purchaseOrders/PurchaseOrdersRouter';
import UserRouter from './user/UserRouter';
import {
  ForgotPassword, ResetPassword, SignIn, SignUp, OAuth,
} from './auth/routes';
import { PrivateRoute, NotMatch } from './auth/components';
import { Header, Sidebar } from './layout/components';
import { validateToken } from './store/auth/authActions';
import { getAccessTokenFromStorage, getRefreshTokenFromStorage } from './auth/authService';

export class AppRouter extends Component {
  state = {
    hasInitialTokenValidationBeenDone: false,
  };

  componentDidMount() {
    const { hasInitialTokenValidationBeenDone } = this.state;
    const { validateTokenOnMount } = this.props;

    if (!hasInitialTokenValidationBeenDone) {
      const accessToken = getAccessTokenFromStorage();
      const refreshToken = getRefreshTokenFromStorage();

      validateTokenOnMount(accessToken, refreshToken)
        .finally(() => {
          this.setState({ hasInitialTokenValidationBeenDone: true });
        });
    }
  }

  render() {
    const { hasInitialTokenValidationBeenDone } = this.state;
    const { isSidebarCollapsed, validateTokenOnMount, accessToken } = this.props;

    if (!hasInitialTokenValidationBeenDone) {
      return (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
          <Spinner color="primary" />
        </div>);
    }

    const isAuthenticated = !!(hasInitialTokenValidationBeenDone && accessToken);

    return (
      <Router>
        <main className="d-flex flex-grow-1 bg-light">
          { isAuthenticated
            ? (<Sidebar isSidebarCollapsed={isSidebarCollapsed} />)
            : null
          }

          <div className="d-flex flex-column flex-grow-1 rounded-left px-4 py-2 st-page shadow-z2">
            { isAuthenticated ? (<Header />) : null }
            <Switch>
              <Route path="/" render={() => <Redirect to="/dashboard" />} exact />
              <Route
                path="/oauth"
                render={(props) => (
                  <OAuth
                    validateToken={validateTokenOnMount}
                    {...props}
                  />
                )}
              />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password" component={ResetPassword} />
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                path="/development"
                component={DevelopmentRouter}
              />
              <PrivateRoute
                path="/dashboard"
                component={DashboardRouter}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/purchase-orders"
                component={PurchaseOrdersRouter}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/user-settings"
                component={UserRouter}
                isAuthenticated={isAuthenticated}
              />
              <Route component={NotMatch} />
            </Switch>

          </div>
        </main>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth, layout }) => ({
  isSidebarCollapsed: layout.isSidebarCollapsed,
  accessToken: auth.accessToken,
});
const mapActionsToProps = (dispatch) => ({
  validateTokenOnMount: (accessToken, refreshToken) => dispatch(validateToken(accessToken, refreshToken)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(AppRouter);

AppRouter.propTypes = {
  validateTokenOnMount: PropTypes.func.isRequired,
  isSidebarCollapsed: PropTypes.bool.isRequired,
  accessToken: PropTypes.string,
};

AppRouter.defaultProps = {
  accessToken: '',
};
