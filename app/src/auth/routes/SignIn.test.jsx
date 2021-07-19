import React from 'react';
import { shallow } from 'enzyme';

import { SignIn } from './SignIn';

describe('SignIn Component', () => {
  let wrapper;
  const signInMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<SignIn signIn={signInMock} />);
  });

  it('should wait for user authentication', () => {
    const data = {
      username: 'username',
      password: 'password',
      keepSignedIn: false,
    };
    signInMock.mockResolvedValue();
    wrapper.find('SignInForm').simulate('submit', data);
    expect(wrapper).toHaveState({ isAuthenticating: true });
  });
});
