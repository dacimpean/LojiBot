import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button, Col, FormGroup, Input, Label, Row, Spinner,
} from 'reactstrap';

import * as layoutActions from '../../store/layout/layoutActions';
import * as developmentService from '../developmentService';

export class Development extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCheckingConnection: false,
    };

    this.textareaRef = React.createRef();
    this.connect = this.connect.bind(this);
  }

  componentDidMount() {
    const { updateTitle } = this.props;

    updateTitle('Development');
  }

  get spinner() {
    const { isCheckingConnection } = this.state;

    if (!isCheckingConnection) {
      return null;
    }

    return (
      <Spinner className="mr-2" size="sm" color="white" />
    );
  }

  connect() {
    const { accessToken } = this.props;

    this.setState({ isCheckingConnection: true });
    developmentService.testQBConnection(accessToken)
      .then(({ data }) => {
        this.textareaRef.current.value = data.success;
      })
      .catch((error) => {
        this.textareaRef.current.value = JSON.stringify(error.response.data);
      })
      .finally(() => {
        setTimeout(() => {
          this.setState({ isCheckingConnection: false });
        }, 500);
      });
  }

  render() {
    const { isCheckingConnection } = this.state;

    return (
      <Fragment>
        <h5>Test connection to QuickadsfBooks</h5>
        <Button
          size="sm"
          color="primary"
          onClick={this.connect}
          disabled={isCheckingConnection}
        >
          {this.spinner}
          Connect
        </Button>
        <Row>
          <Col xs={6}>
            <FormGroup>
              <Label>Response</Label>
              <Input type="textarea" innerRef={this.textareaRef} />
            </FormGroup>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  accessToken: auth.accessToken,
});
const mapActionsToProps = (dispatch) => ({
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
});

export default connect(mapStateToProps, mapActionsToProps)(Development);

Development.propTypes = {
  accessToken: PropTypes.string.isRequired,
  updateTitle: PropTypes.func.isRequired,
};
