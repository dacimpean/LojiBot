import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import classNames from 'classnames';

import { Icon, SimpleTooltip } from '../../utils';
import UserMenuContainer from '../../user/components/UserMenu';
import Navigation from './Navigation';
import SubNavigationContainer from './SubNavigation';

export default function Sidebar({ isSidebarCollapsed }) {
  const sidebarClassNames = classNames(
    'st-sidebar',
    'bg-light',
    'd-flex',
    'flex-row',
    'flex-shrink-0',
    {
      collapsed: isSidebarCollapsed,
    }
  );

  return (
    <div className={sidebarClassNames}>
      <div
        className="d-flex flex-column align-items-center
        justify-content-between st-sidebar--main py-2"
      >
        <div>
          <Link to="/">
            <h2 id="loji" className="text-primary text-center mb-1">
              <Icon iconName="globe" />
            </h2>
          </Link>
          <Navigation />
        </div>

        <div className="d-flex flex-column">
          <Button
            id="notification"
            className="shadow-none border-0 rounded-circle st-icon-btn mb-2"
            color="light"
          >
            <Icon iconName="bell" />
          </Button>
          <SimpleTooltip target="notification" trigger="hover" placement="right">
            Notifications
          </SimpleTooltip>

          <UserMenuContainer />
        </div>
      </div>
      <div className="d-flex flex-column flex-grow-1 flex-shrink-1 px-2 py-2 st-sidebar--helper">
        <h5 className="text-center pt-2">Loji Service</h5>
        <SubNavigationContainer />
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
};
