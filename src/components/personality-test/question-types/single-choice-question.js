import React from 'react';
import PropTypes from 'prop-types';
import { QuestionCount, Question, QuestionOptions } from '../../index';

const SingleChoiceQuestion = (props) => (
  <div className="single-choice-question">
    <QuestionCount counter={props.questionId} total={props.questionTotal} />
    <Question content={props.question} />
    <QuestionOptions options={props.options} onAnswerSelected={props.onAnswerSelected} />
  </div>
);

export default SingleChoiceQuestion;

SingleChoiceQuestion.propTypes = {
  questionId: PropTypes.number,
  questionTotal: PropTypes.number,
  question: PropTypes.string,
  onAnswerSelected: PropTypes.func
};