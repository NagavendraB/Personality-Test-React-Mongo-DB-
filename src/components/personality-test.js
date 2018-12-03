import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

// Components
import {SingleChoiceQuestion, ConditionalQuestion} from '.';

class PersonalityTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConditionalQuestion: false
    }
  }

  onAnswerSelected = (event) => {
    const {questionType} = this.props;
    const {currentTarget: {value}} = event;

    if (questionType.type === "single_choice_conditional") {
      const {questionType: {condition:{predicate}}} = this.props;
      this.setState({showConditionalQuestion: predicate.exactEquals[1] === value});
    }
    this.props.onAnswerSelected(value);
  }

  onClickNextQuestion = () => {
    this.setState({showConditionalQuestion: false});
    this.props.onClickNextQuestion();
  }

  render() {
    const {
      questionId, 
      questionTotal, 
      question, 
      questionType, 
      onChangeSlider
    } = this.props;

    return (
      <CSSTransitionGroup
        className="container"
        component="div"
        transitionName="fade"
        transitionEnterTimeout={800}
        transitionLeaveTimeout={500}
        transitionAppear
        transitionAppearTimeout={500}>
        <div key={questionId}>
          <SingleChoiceQuestion
            questionId={questionId} 
            questionTotal={questionTotal}
            question={question}
            options={questionType.options}
            onAnswerSelected={this.onAnswerSelected}
          />
          {this.state.showConditionalQuestion &&
            <ConditionalQuestion
              condition={questionType.condition}
              onChangeSlider={onChangeSlider} 
            />
          }
          <div className="next-question" onClick={this.onClickNextQuestion}>Next Question ></div>
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default PersonalityTest;

PersonalityTest.propTypes = {
  questionType: PropTypes.object,
  question: PropTypes.string,
  questionId: PropTypes.number,
  questionTotal: PropTypes.number,
  onClickNextQuestion: PropTypes.func,
  onChangeSlider: PropTypes.func
};