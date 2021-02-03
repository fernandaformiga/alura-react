import React from 'react';
import db from '../db.json';
import Widget from '../src/components/widget.js';
import Button from '../src/components/button.js';
import QuizContainer from '../src/components/quizcontainer.js'
import QuizBackground from '../src/components/quizbg.js'


function ResultWidget({ results}) {
  return (
    <Widget>
      <Widget.Header>
        RESULT
      </Widget.Header>

      <Widget.Content>
        <p>You got 
          {' '}
          {results.filter((x) => x).length}
          {' '}
          questions right!</p>
        <ul>
          {results.map((result, index) => (
         <li key={`result__${index}`}>
         #
         {index + 1}
         {' '}
         {result === true
           ? ' right'
           : ' wrong'}
        </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
    return (
      <Widget>
        <Widget.Header>
          Carregando...
        </Widget.Header>
  
        <Widget.Content>
          Loading
        </Widget.Content>
      </Widget>
    );
  }
  
  function QuestionWidget({
    question,
    questionIndex,
    totalQuestions,
    onSubmit,
    addResult,
  }) {
    const [selectedAlternative, setSelectedAlternative] = React.useState();
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
    const [results, setResults] = React.useState([]);
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;
    return (
      <Widget>
        <Widget.Header>
          {/* <BackLinkArrow href="/" /> */}
          <h3>
            {`Question ${questionIndex + 1} out of ${totalQuestions}`}
          </h3>
        </Widget.Header>
  
        <img
          alt="Descrição"
          style={{
            width: '100%',
            height: '150px',
            objectFit: 'cover',
          }}
          src={question.image}
        />
        <Widget.Content>
          <h2>
            {question.title}
          </h2>
          <p>
            {question.description}
          </p>
  
          <form
            onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              setIsQuestionSubmited(true);
              setTimeout(() => {
                addResult(isCorrect);
                onSubmit();
                setIsQuestionSubmited(false);
                setSelectedAlternative(undefined);
              }, 3 * 1000);
            }}
          >
            {question.alternatives.map((alternative, alternativeIndex) => {
              const alternativeId = `alternative__${alternativeIndex}`;
              return (
                <Widget.Topic
                  as="label"
                  key={alternativeId}
                  htmlFor={alternativeId}
                >
                  <input
                    // style={{ display: 'none' }}
                    id={alternativeId}
                    name={questionId}
                    onChange={() => setSelectedAlternative(alternativeIndex)}
                    type="radio"
                  />
                  {alternative}
                </Widget.Topic>
              );
            })}
 

            {/* <pre>
              {JSON.stringify(question, null, 4)}
            </pre> */}
            <Button type="submit" disabled = {!hasAlternativeSelected}>
              SEND
            </Button>
            {isQuestionSubmited && isCorrect && <p>You got it right!</p>}
            {isQuestionSubmited && !isCorrect && <p>Oops, wrong option!</p>}
          </form>
        </Widget.Content>
      </Widget>
    );
  }
  
  const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
  };
  export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults] = React.useState([]);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    function addResult(result) {
      // results.push(result);
      setResults([
        ...results,
        result,
      ]);
    }
  
    // [React chama de: Efeitos || Effects]
    // React.useEffect
    // atualizado === willUpdate
    // morre === willUnmount
    React.useEffect(() => {
      // fetch() ...
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 1 * 1000);
    // nasce === didMount
    }, []);
  
    function handleSubmitQuiz() {
      const nextQuestion = questionIndex + 1;
      if (nextQuestion < totalQuestions) {
        setCurrentQuestion(nextQuestion);
      } else {
        setScreenState(screenStates.RESULT);
      }
    }
  
    return (
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>
          {screenState === screenStates.QUIZ && (
            <QuestionWidget
              question={question}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )}
  
          {screenState === screenStates.LOADING && <LoadingWidget />}
  
          {screenState === screenStates.RESULT && <ResultWidget  results={results} />}
        </QuizContainer>
      </QuizBackground>
    );
  }