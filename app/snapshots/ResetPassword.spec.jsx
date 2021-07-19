import React from 'react';
import { shallow } from 'enzyme';

import ResetPassword from '../src/auth/routes/ResetPassword';

describe('Reset Password UI', () => {
  it('should render reset password form', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(wrapper).toMatchSnapshot();
  });
});
