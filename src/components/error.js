import React from 'react';
import PropTypes from 'prop-types';

const Error = (props) => (
  <p>
    There was an error loading the repos.
    <button onClick={props.loadData}>Try again</button>
  </p>
);

export default Error;

Error.propTypes = {
  loadData: PropTypes.func
};