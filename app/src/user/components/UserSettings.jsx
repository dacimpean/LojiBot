import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row, Col, Spinner, Table, Badge,
} from 'reactstrap';

import InviteTeamMemberForm from './IvinteTeamMemberForm';
import * as layoutActions from '../../store/layout/layoutActions';
import * as userActions from '../../store/user/userActions';


export class UserSettings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isDataFetched: false,
      isMemberAdding: false,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      updateTitle, changeSubNavigation, fetchInvitedUsers, fetchTeamMembers,
    } = this.props;

    updateTitle('User Settings');
    changeSubNavigation();
    Promise.all([
      fetchTeamMembers(),
      fetchInvitedUsers(),
    ])
      .finally(() => {
        this.setState({ isDataFetched: true });
      });
  }

  onSubmit({ email }, { resetForm }) {
    const { inviteTeamMember } = this.props;

    this.setState({ isMemberAdding: true });
    inviteTeamMember(email)
      .finally(() => {
        this.setState({ isMemberAdding: false }, resetForm);
      });
  }

  get teamMembers() {
    const { teamMembers, invitedUsers } = this.props;

    return (
      <div className="p-2 rounded-top st-order-items__container mb-2">
        <Table className="st-table st-table--small mb-0">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.email}</td>
                <td>{member.username}</td>
                <td>
                  {member.is_manager
                    ? <Badge color="info">Manager</Badge>
                    : <Badge color="secondary">Default</Badge>
                  }
                </td>
              </tr>
            ))}
            {invitedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td />
                <td><Badge color="warning">PreRegistered</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    const { isDataFetched, isMemberAdding } = this.state;
    const { activeUser } = this.props;

    if (!isDataFetched) {
      return (
        <div className="d-flex flex-grow-1 align-items-center justify-content-center">
          <Spinner color="primary" />
        </div>
      );
    }

    return (
      <Fragment>
        <Row className="mb-2">
          <Col xs={12}>
            <span className="text-secondary mr-2">Email:</span>
            {activeUser.email}
          </Col>
          <Col xs={12}>
            <span className="text-secondary mr-2">Username:</span>
            {activeUser.username}
          </Col>
        </Row>
        <h4 className="mb-0">Company Name</h4>
        <div className="d-flex justify-content-end py-2">
          <InviteTeamMemberForm onSubmit={this.onSubmit} isMemberAdding={isMemberAdding} />
        </div>
        {this.teamMembers}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  activeUser: user.user,
  teamMembers: user.members,
  invitedUsers: user.invitedUsers,
});

const mapActionsToProps = (dispatch) => ({
  updateTitle: (title) => dispatch(layoutActions.updateTitle(title)),
  inviteTeamMember: (email) => dispatch(userActions.inviteTeamMember(email)),
  fetchTeamMembers: () => dispatch(userActions.fetchTeamMembers()),
  fetchInvitedUsers: () => dispatch(userActions.fetchInvitedUsers()),
  changeSubNavigation: () => dispatch(layoutActions.changeSubNavigation('')),
});

export default connect(mapStateToProps, mapActionsToProps)(UserSettings);

UserSettings.propTypes = {
  teamMembers: PropTypes.array.isRequired,
  invitedUsers: PropTypes.array.isRequired,
  updateTitle: PropTypes.func.isRequired,
  activeUser: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    id: PropTypes.number,
    is_manager: PropTypes.bool,
  }).isRequired,
  inviteTeamMember: PropTypes.func.isRequired,
  changeSubNavigation: PropTypes.func.isRequired,
  fetchInvitedUsers: PropTypes.func.isRequired,
  fetchTeamMembers: PropTypes.func.isRequired,
};
