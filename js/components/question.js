



var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';

var Question= function(props){


  return(
       <div className='question'>

          <p style={{textAlign:'center'}}>{props.currentQuestion.questionVerbal} ?</p>

        </div>

  );
};

var mapStateToProps = function(state){

   return {
     currentQuestion:state.currentQuestion
   }
}

var QuestionContainer = connect(mapStateToProps)(Question)

export default QuestionContainer;
