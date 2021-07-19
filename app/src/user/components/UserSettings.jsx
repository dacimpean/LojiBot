import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as layoutActions from '../../store/layout/layoutActions';
import C2QBButton from '../../auth/components/C2QBButton';

export class UserSettings extends Component {
  componentDidMount() {
    const { updateTitle } = this.props;

    updateTitle('User Settings');
  }

  render() {
    return (<C2QBButton />);
  }
}

const mapStateToProps = (state) => state;

const mapActionsToProps = (dispatch) => ({
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
});

export default connect(mapStateToProps, mapActionsToProps)(UserSettings);

UserSettings.propTypes = {
  updateTitle: PropTypes.func.isRequired,
};
