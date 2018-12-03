import React from 'react';
import PropTypes from 'prop-types';
import { QuestionOption } from '../index';

const QuestionOptions = (props) => (
  <div className="question-options">
    {props.options.map((option, key) => (
      <QuestionOption
        key={key}
        answerContent={option}
        onAnswerSelected={props.onAnswerSelected} />
    ))}
  </div>
);

export default QuestionOptions;

QuestionOptions.propTypes = {
  options: PropTypes.array,
  onAnswerSelected: PropTypes.func
};
