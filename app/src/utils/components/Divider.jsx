import React from 'react';
import PropTypes from 'prop-types';

export default function Divider({ text }) {
  return (
    <div className="divider text-center mb-4">
      <span className="bg-white px-3">{text}</span>
    </div>
  );
}

Divider.propTypes = {
  text: PropTypes.string.isRequired,
};
