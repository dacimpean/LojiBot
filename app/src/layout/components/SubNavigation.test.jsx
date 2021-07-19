import React from 'react';
import { shallow } from 'enzyme';

import { SubNavigation } from './SubNavigation';
import SubNavigationPurchaseOrders from './SubNavigationPurchaseOrders';
import SubNavigationPurchaseOrder from './SubNavigationPurchaseOrder';
import * as subNavigationTypes from '../../store/layout/layoutSubNavigationTypes';

describe('<SubNavigation />', () => {
  let wrapper;
  const initialProps = {
    subNavigationType: '',
  };

  beforeEach(() => {
    wrapper = shallow(<SubNavigation {...initialProps} />);
  });

  it('should render purchase orders sub navigation', () => {
    wrapper.setProps({ subNavigationType: subNavigationTypes.PURCHASE_ORDERS });
    expect(wrapper).toContainReact(<SubNavigationPurchaseOrders />);
  });

  it('should render purchase order sub navigation', () => {
    wrapper.setProps({ subNavigationType: subNavigationTypes.PURCHASE_ORDER });
    expect(wrapper).toContainReact(<SubNavigationPurchaseOrder />);
  });
});
