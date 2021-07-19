import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from './SignUp';

describe('SignUp Component', () => {
  let wrapper;
  const signUpMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<SignUp signUp={signUpMock} />);
  });

  it('should wait for user registration', () => {
    const data = {
      username: 'username',
      email: 'test@test.test',
      password: 'password',
      keepSignedIn: true,
    };
    signUpMock.mockResolvedValue();
    wrapper.find('SignUpForm').simulate('submit', data);
    expect(wrapper).toHaveState({ isAuthenticating: true });
  });
});
