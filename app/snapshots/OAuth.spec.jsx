import React from 'react';
import { shallow } from 'enzyme';

import OAuth from '../src/auth/routes/OAuth';

describe('OAuth UI component', () => {
  let wrapper;
  const validateTokenMock = jest.fn();
  const location = {};

  beforeEach(() => {
    validateTokenMock.mockResolvedValueOnce();
    wrapper = shallow(<OAuth validateToken={validateTokenMock} location={location} />);
  });

  it('should render progress bar', () => {
    wrapper.setState({
      hasValidationBeenFailed: false,
      redirect: false,
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render redirect to sign in if authentication failed', () => {
    wrapper.setState({ hasValidationBeenFailed: true });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render redirect to root if authentication succeed', () => {
    wrapper.setState({ redirect: true });
    expect(wrapper).toMatchSnapshot();
  });
});
