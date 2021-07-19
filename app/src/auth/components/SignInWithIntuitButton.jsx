import React, { Component } from 'react';
import { apiUrl, apiVersion } from '../../config';

import signInWithIntuit from '../../assets/images/sign_in_blue_btn_lg_default.png';
import signInWithIntuitHovered from '../../assets/images/sign_in_blue_btn_lg_hover.png';

export default class SignInWithIntuitButton extends Component {
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

    const imgSrc = isImgHovered ? signInWithIntuitHovered : signInWithIntuit;

    return (
      <a href={`${apiUrl}/v${apiVersion}/qb/auth/`}>
        <img
          src={imgSrc}
          onMouseEnter={this.toggleImgSrc}
          onMouseLeave={this.toggleImgSrc}
          alt="Sign in with Intuit"
        />
      </a>
    );
  }
}
