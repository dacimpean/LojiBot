import React from 'react';
import { shallow } from 'enzyme';

import { SignUp } from '../src/auth/routes/SignUp';

describe('SignUp UI', () => {
  const signUpMock = jest.fn();

  it('should render authentication form', () => {
    const wrapper = shallow(<SignUp signUp={signUpMock} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should redirect once user is signed up', () => {
    const wrapper = shallow(<SignUp signUp={signUpMock} />);
    wrapper.setState({ redirect: true });
    expect(wrapper).toMatchSnapshot();
  });
});
