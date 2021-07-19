import jwtDecode from 'jwt-decode';
import * as authActions from '../../store/auth/authActions';
import * as authService from '../../auth/authService';

export default function jwt({ dispatch, getState }) {
  return (next) => (action) => {
    const isActionAsynchronous = typeof action === 'function';

    if (!isActionAsynchronous) {
      return next(action);
    }

    const { auth } = getState();
    const {
      refreshingTokenPromise,
      accessToken,
      refreshToken,
    } = auth;

    if (!accessToken || !refreshToken) {
      return next(action);
    }

    const decodedAccessToken = jwtDecode(accessToken);

    if (!hasAccessTokenBeenExpired(decodedAccessToken)) {
      return next(action);
    }

    if (refreshingTokenPromise) {
      return refreshingTokenPromise.then(() => next(action));
    }

    const newRefreshingTokenPromise = authService.refreshToken(refreshToken);
    dispatch(authActions.handleTokenRefreshing(newRefreshingTokenPromise));

    return newRefreshingTokenPromise
      .then(({ data }) => {
        const { access } = data;

        return dispatch(authActions.handleSuccessfulRefreshing(access));
      })
      .catch(({ error }) => dispatch(authActions.handleFailedRefreshing(error)));
  };
}

function hasAccessTokenBeenExpired({ exp }) {
  const today = new Date();
  const refreshThreshold = Math.floor(today.valueOf() / 1000) + 240;

  return exp < refreshThreshold;
}
