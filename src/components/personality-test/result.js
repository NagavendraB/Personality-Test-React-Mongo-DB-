import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

const Result = () => (
  <CSSTransitionGroup
    className="container result"
    component="div"
    transitionName="fade"
    transitionEnterTimeout={800}
    transitionLeaveTimeout={500}
    transitionAppear
    transitionAppearTimeout={500}>
    <div className="result-text">Thanks for your answers!</div>
  </CSSTransitionGroup>
);

export default Result;
