import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

// Components
import {
  PersonalityTest, 
  Result, 
  Question, 
  QuestionCount, 
  AnswerOption, 
  SingleChoiceQuestion, 
  ConditionalQuestion,
  QuestionOptions,
  QuestionOption
} from '../components';
import { getUserQuestions } from '../services/service';

Enzyme.configure({ adapter: new Adapter() });

const options = [ "option1", "option2", "option3", "option4"];

it('`PersonalityTest` exist and be a component', () => expect(PersonalityTest).toBeInstanceOf(Function));
it('`Result` exist and be a component', () => expect(Result).toBeInstanceOf(Function));
it('`Question` exist and be a component', () => expect(Question).toBeInstanceOf(Function));
it('`QuestionCount` exist and be a component', () => expect(QuestionCount).toBeInstanceOf(Function));
it('`SingleChoiceQuestion` exist and be a component', () => expect(SingleChoiceQuestion).toBeInstanceOf(Function));
it('`ConditionalQuestion` exist and be a component', () => expect(ConditionalQuestion).toBeInstanceOf(Function));
it('`QuestionOptions` exist and be a component', () => expect(QuestionOptions).toBeInstanceOf(Function));
it('`QuestionOption` exist and be a component', () => expect(QuestionOption).toBeInstanceOf(Function));

it('should load test questions', async () => {
  const result = await getUserQuestions('/test/questions');
  expect(result.data.questions).toBeDefined();
});

it('`Next Question` should trigger on click event when user clicks on it', () => {
  const mockCallBack = jest.fn();
  const wrapper = shallow(<div className="next-question" onClick={mockCallBack}>Next Question ></div>);
  
  wrapper.find('.next-question').simulate('click');
});

it('`SingleChoiceQuestion` component should render question count, question, question options', () => {
  const wrapper = shallow(<SingleChoiceQuestion question="Test Question" questionId={1} />);
  
  expect(wrapper.find('.single-choice-question')).toBeDefined();
  expect(wrapper.find('.question-count')).toBeDefined();
  expect(wrapper.find('.question')).toBeDefined();
  expect(wrapper.find('.question-options')).toBeDefined();
});

it('`QuestionOptions` component should render list of options from provided array', () => {
  const wrapper = shallow(<QuestionOptions options={options} />);
  const results = wrapper.find('.question-options').children();
  
  expect(results.length).toBe(options.length);
  expect(wrapper.find('.question-options')).toBeDefined();
  expect(wrapper.find('.answer-option')).toBeDefined();
});

it('`QuestionCount` component should render question number and question count', () => {
  const props = {counter: 1, total: 1},
  wrapper = shallow(<QuestionCount {...props} />);
  expect(wrapper.find('.question-count')).toBeDefined();
});

it('`Question` component should render provided question', () => {
  const wrapper = shallow(<Question content="This is Question" />);
  expect(wrapper.find('.question')).toBeDefined();
});

it('`Result` component should render result text', () => {
  const wrapper = shallow(<Result />);
  expect(wrapper.find('.result-text')).toBeDefined();
});

