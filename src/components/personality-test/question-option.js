import React from 'react';
import PropTypes from 'prop-types';

const QuestionOption = (props) => (
  <li className="answer-option">
    <input
      type="radio"
      className="radio-custom-button"
      name="radio-group"
      id={props.answerContent}
      value={props.answerContent}
      onChange={props.onAnswerSelected}
    />
    <label className="radio-custom-label" htmlFor={props.answerContent}>
      {props.answerContent}
    </label>
  </li>
);

export default QuestionOption;

QuestionOption.propTypes = {
  answerContent: PropTypes.string,
  onAnswerSelected: PropTypes.func
};
