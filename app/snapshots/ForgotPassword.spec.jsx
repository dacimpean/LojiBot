import React from 'react';
import { shallow } from 'enzyme';

import ForgotPassword from '../src/auth/routes/ForgotPassword';

describe('Forgot Password UI', () => {
  it('should render forgot password form', () => {
    const wrapper = shallow(<ForgotPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
