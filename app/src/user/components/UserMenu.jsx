import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Popover, PopoverBody } from 'reactstrap';

import { Icon, SimpleTooltip } from '../../utils';
import * as authActions from '../../store/auth/authActions';

export class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.userMenuRef = React.createRef();
    this.togglePopover = this.togglePopover.bind(this);
  }

  get tooltip() {
    const { isOpen } = this.state;

    if (isOpen) {
      return null;
    }

    return (
      <SimpleTooltip target={this.userMenuRef} trigger="hover" placement="right">
        User Menu
      </SimpleTooltip>
    );
  }

  togglePopover() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { isOpen } = this.state;
    const { signOut } = this.props;

    return (
      <Fragment>
        <Button
          innerRef={this.userMenuRef}
          className="shadow-none border-0 rounded-circle st-icon-btn mb-3"
          color="light"
          onClick={this.togglePopover}
        >
          <Icon iconName="user" />
        </Button>

        {this.tooltip}
        <Popover
          target={this.userMenuRef}
          isOpen={isOpen}
          toggle={this.togglePopover}
          delay={{ show: 120, hide: 50 }}
          placement="right"
          trigger="legacy"
          hideArrow
        >
          <PopoverBody className="d-flex flex-column px-0 py-1">
            <Link
              className="d-flex align-items-center justify-content-start
                py-2 px-3 text-decoration-none st-popover-menu__item"
              to="/development"
            >
              <Icon className="mr-2" iconName="cpu" /> Development
            </Link>
            <Link
              className="d-flex align-items-center justify-content-start
                py-2 px-3 text-decoration-none st-popover-menu__item"
              to="/user-settings"
            >
              <Icon className="mr-2" iconName="settings" /> Settings
            </Link>
            <Link
              className="d-flex align-items-center justify-content-start
                py-2 px-3 text-decoration-none st-popover-menu__item"
              to="/signin"
              onClick={signOut}
            >
              <Icon className="mr-2" iconName="log-out" /> Sign Out
            </Link>
          </PopoverBody>
        </Popover>
      </Fragment>
    );
  }
}

const mapStateToProps = () => ({});
const mapActionsToProps = (dispatch) => ({
  signOut: () => dispatch(authActions.signOut()),
});

export default connect(mapStateToProps, mapActionsToProps)(UserMenu);

UserMenu.propTypes = {
  signOut: PropTypes.func.isRequired,
};
