import React, { Component } from 'react';
import './assets/css/personality-test.css';
import {PersonalityTest, Result, Error, Loader} from './components';
import {
  setUserAnswers, 
  getAllUserAnswers, 
  getUserQuestions
} from './services/service';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionId: 0,
      allQuestions: [],
      userCurrentAnswer: '',
      loading: false,
    };
    this.userAllAnswers = [];
  }

  componentDidMount() {
    this.userAllAnswers = [];
    this.loadData();
  }

  // loadData() is used to fetch the data from service
  loadData = async () => {
    const result = await getUserQuestions("/test/questions"); 
    this.setState({
      loading: false,
      error: false,
      allQuestions: result.data.questions
    });
  }

  // onClickNextQuestion() will store the user answers for current question 
  onClickNextQuestion = () => {
    this.storeUserAnswers();
    setTimeout(() => this.setNextQuestion(), 300);
  }


  // setNextQuestion() will set the next question on screen 
  setNextQuestion = () => {
    this.setState((state, props) => ({
      questionId: state.questionId + 1,
      userCurrentAnswer: ''
    }));
  }

  // storeCurrentQuestionAnswer() will store the user answer for current question
  storeCurrentQuestionAnswer = (value) => {
    this.setState({userCurrentAnswer: value});
  }

  // storeUserAnswers() will store the all user selected answers and corresponding questions
  storeUserAnswers = async () => {
    const {questionId, allQuestions, userCurrentAnswer} = this.state;

    this.userAllAnswers[questionId] = {
      question: allQuestions[questionId].question,
      userCurrentAnswer: userCurrentAnswer
    };

    // Store User answers in Database (Monogo DB)
    if (allQuestions.length - 1 === questionId) {
      setUserAnswers("/user/answers", this.userAllAnswers);
      const response = await getAllUserAnswers("/user/answers");
      console.log(response, this.userAllAnswers);
    }
    console.log(this.userAllAnswers);
  }

  render() {
    const {loading, error, allQuestions, questionId} = this.state;
    
    // Check for more Questions
    const isTestRunning = allQuestions.length && allQuestions.length > questionId;

    // Read Question, Question Type, Answer Options
    const question = allQuestions[questionId] && allQuestions[questionId].question;
    const questionType = allQuestions[questionId] && allQuestions[questionId].question_type;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <Error loadData={this.loadData} />;
    }

    return (
      <div className="app">
        <div className="app-header">
          <h2>Personality Test</h2>
        </div>
        { isTestRunning  ? 
          <PersonalityTest
            questionId={questionId + 1}
            question={question}
            questionType={questionType}
            questionTotal={allQuestions.length}
            onAnswerSelected={this.storeCurrentQuestionAnswer}
            onClickNextQuestion={this.onClickNextQuestion}
          /> : 
          <Result />
        }
      </div>
    );
  }
}

export default App;