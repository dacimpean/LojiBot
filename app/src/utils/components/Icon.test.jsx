import React from 'react';
import { shallow } from 'enzyme';
import feather from 'feather-icons';

import Icon from './Icon';

describe('Icon component', () => {
  let wrapper;
  let toSvgMock;
  const defaultProps = {
    iconName: 'file',
  };

  beforeEach(() => {
    toSvgMock = jest.spyOn(feather.icons[defaultProps.iconName], 'toSvg');
    wrapper = shallow(<Icon {...defaultProps} />);
  });

  afterEach(() => {
    toSvgMock.mockRestore();
  });

  it('should render st-icon with default size', () => {
    expect(wrapper).toHaveClassName('st-icon');
    expect(toSvgMock).toHaveBeenCalledWith({
      height: 16,
      width: 16,
    });
  });

  it('should pass custom class to an icon', () => {
    wrapper.setProps({ className: 'custom-class' });
    expect(wrapper).toHaveClassName('custom-class');
  });

  it('should render an icon with custom color and size', () => {
    wrapper.setProps({ color: 'red', size: 24 });
    expect(toSvgMock).toHaveBeenCalledWith({
      color: 'red',
      width: 24,
      height: 24,
    });
  });
});
