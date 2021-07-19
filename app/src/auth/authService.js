import { request } from '../utils';

export const getAccessTokenFromStorage = () => {
  if (!localStorage) {
    return null;
  }

  return localStorage.getItem('access');
};

export const getRefreshTokenFromStorage = () => {
  if (!localStorage) {
    return null;
  }

  return localStorage.getItem('refresh');
};

export const setAccessTokenInStorage = (token) => {
  if (!localStorage) {
    return;
  }

  localStorage.setItem('access', token);
};

export const setRefreshTokenInStorage = (token) => {
  if (!localStorage) {
    return;
  }

  localStorage.setItem('refresh', token);
};

export const validateToken = (accessToken) => request(
  'get', '/user/whoami/', {}, accessToken
);

export const authenticateCustomer = ({ username, password }) => request(
  'post', '/token/', { username, password }
);

export const createCustomer = ({ email, username, password }) => request(
  'post', '/user/registration/', { username, password, email }
);

export const synchronizeWithQB = () => request(
  'post', '/qb/sync/', {}, getAccessTokenFromStorage()
);

export const refreshToken = (refresh) => request(
  'post', '/token/refresh/', { refresh }
);
