import React, { Component } from 'react';

import c2qb from '../../assets/images/c2qb_green_btn_lg_default.png';
import c2qbHovered from '../../assets/images/c2qb_green_btn_lg_hover.png';

export default class C2QBButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isImgHovered: false,
    };

    this.toggleImgSrc = this.toggleImgSrc.bind(this);
  }

  toggleImgSrc() {
    this.setState(({ isImgHovered }) => ({ isImgHovered: !isImgHovered }));
  }

  render() {
    const { isImgHovered } = this.state;

    const imgSrc = isImgHovered ? c2qbHovered : c2qb;

    return (
      <a href="#">
        <img
          className="w-25 h-auto"
          src={imgSrc}
          onMouseEnter={this.toggleImgSrc}
          onMouseLeave={this.toggleImgSrc}
          alt="Connect to QuickBooks"
        />
      </a>
    );
  }
}
