import { request } from '../utils';

export const testQBConnection = (accessToken) => request(
  'post', '/qb/testqbconnect/', {}, accessToken
);
