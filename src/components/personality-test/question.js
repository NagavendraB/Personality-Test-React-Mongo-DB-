import React from 'react';
import PropTypes from 'prop-types';

const Question = (props) => (
  <div className="question-box">
    <h2 className="question">{props.content}</h2>
  </div>
);

export default Question;

Question.propTypes = {
  content: PropTypes.string
};