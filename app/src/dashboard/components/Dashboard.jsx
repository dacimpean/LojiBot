import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as layoutActions from '../../store/layout/layoutActions';

export class Dashboard extends Component {
  componentDidMount() {
    const { updateTitle } = this.props;

    updateTitle('Dashboard');
  }

  render() {
    return (
      <div>Main</div>
    );
  }
}

const mapStateToProps = (state) => state;
const mapActionsToProps = (dispatch) => ({
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
});

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);

Dashboard.propTypes = {
  updateTitle: PropTypes.func.isRequired,
};
