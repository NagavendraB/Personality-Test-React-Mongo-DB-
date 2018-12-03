import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';

import { Question } from '../../index';

class ConditionalQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      volume: 0
    }
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value
    })
  }

  render() {
    const {if_positive: {question, question_type: {range}}} = this.props.condition;

    return(
      <div className="conditional-question">
        <Question content={question} />
        <Slider
          orientation="horizontal"
          min={range.from}
          max={range.to}
          value={this.state.volume}
          onChange={this.handleOnChange}
          labels={{[range.from]: range.from, [range.to]: range.to}}	 />
      </div>
    );
  }
}

export default ConditionalQuestion;

ConditionalQuestion.propTypes = {
  condition: PropTypes.object
};