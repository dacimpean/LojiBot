import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '../../utils';

export default class PurchaseOrdersTableHeadColumn extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  get sortIcon() {
    const { title, activeFilter } = this.props;

    const isCurrentColumnFiltered = activeFilter.title === title;
    const iconClassNames = classNames(
      'st-table__sort-icon ml-2', {
        'st-table__sort-icon--muted': !isCurrentColumnFiltered,
      }
    );

    if (!isCurrentColumnFiltered) {
      return (<Icon className={iconClassNames} iconName="arrow-down" />);
    }

    if (activeFilter.asc) {
      return (<Icon className={iconClassNames} iconName="arrow-down" />);
    }

    return (<Icon className={iconClassNames} iconName="arrow-up" />);
  }

  handleClick() {
    const { title, activeFilter, changeFilter } = this.props;

    const isCurrentColumnFiltered = activeFilter.title === title;

    if (isCurrentColumnFiltered) {
      changeFilter({ title, asc: !activeFilter.asc });
    } else {
      changeFilter({ title, asc: true });
    }
  }

  render() {
    const { title, sortable } = this.props;

    if (!sortable) {
      return (
        <th className="st-table__th">
          {title}
        </th>
      );
    }

    return (
      <th className="st-table__th st-table__th--sortable" onClick={this.handleClick}>
        {title}
        {this.sortIcon}
      </th>
    );
  }
}

PurchaseOrdersTableHeadColumn.propTypes = {
  title: PropTypes.string.isRequired,
  sortable: PropTypes.bool.isRequired,
  changeFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.shape({
    title: PropTypes.string,
    asc: PropTypes.bool,
  }),
};

PurchaseOrdersTableHeadColumn.defaultProps = {
  activeFilter: {
    title: '',
    asc: true,
  },
};
