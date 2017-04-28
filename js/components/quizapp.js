

var React = require('react');
var ReactDOM = require('react-dom');
import OutterboxContainer from './outterbox.js'

var QuizApp= function(){

  return(
    <div className="quiz-background">
       <div>
      <OutterboxContainer/>
        </div>
    </div>
  );
};


export default QuizApp;
