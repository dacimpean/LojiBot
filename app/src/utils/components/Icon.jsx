import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import feather from 'feather-icons';

export default function Icon({
  iconName, color, size, className,
}) {
  const iconClasses = classNames('st-icon', className);
  const options = {
    width: size,
    height: size,
  };

  if (color) {
    options.color = color;
  }

  const icon = feather.icons[iconName].toSvg(options);

  return (
    <span className={iconClasses} dangerouslySetInnerHTML={{ __html: icon }} />
  );
}

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
};

Icon.defaultProps = {
  className: '',
  color: '',
  size: 16,
};
