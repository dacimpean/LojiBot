import React, { Component } from 'react';
import { Tooltip } from 'reactstrap';

export default class SimpleTooltip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  toggleTooltip() {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  }

  render() {
    const { props } = this;
    const { isOpen } = this.state;

    return (
      <Tooltip
        innerClassName="px-2 py-1 st-tooltip"
        arrowClassName="d-none"
        isOpen={isOpen}
        toggle={this.toggleTooltip}
        delay={{ show: 50, hide: 50 }}
        {...props}
      />
    );
  }
}
