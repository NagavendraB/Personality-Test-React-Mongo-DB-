import React from 'react';
import PropTypes from 'prop-types';

const QuestionCount = (props) => (
  <div className="question-count">
    Question <span>{props.counter}</span> of <span>{props.total}</span>
  </div>
);

export default QuestionCount;

QuestionCount.propTypes = {
  counter: PropTypes.number,
  total: PropTypes.number
};