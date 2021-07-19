import React from 'react';
import { shallow } from 'enzyme';

import { SignIn } from '../src/auth/routes/SignIn';

describe('SignIn UI', () => {
  const signInMock = jest.fn();

  it('should render authentication form', () => {
    const wrapper = shallow(<SignIn signIn={signInMock} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect if user has been authenticated', () => {
    const wrapper = shallow(<SignIn signIn={signInMock} />);
    wrapper.setState({ redirect: true });
    expect(wrapper).toMatchSnapshot();
  });
});
