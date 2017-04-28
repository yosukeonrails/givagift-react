

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import Answer from './answer.js'
import getAnswerPoints from '../getanswerpoints.js'
import {setAnswerPoints, selectAnswer} from '../actions/index.js'

export class AnswersBox extends React.Component {
  constructor(props){
    super(props);

    var nOfAnswers=this.props.currentQuestion.listOfAnswers.length;



    var answerPoints= getAnswerPoints(10,nOfAnswers,100);

    this.props.dispatch(setAnswerPoints(answerPoints));

  }


  render(){


      var AnswerList=[];
        var alternatives=['a','b','c','d','e' ];

      //  this.props.dispatch(setAnswerPoints(getAnswerPoints(10,nOfAnswers,100)));


      if(this.props.answerPoints){



        for( var i=0; i< this.props.currentQuestion.listOfAnswers.length; i++){

         AnswerList.push( <Answer key={i} answerId={i} points={this.props.answerPoints[i]} questionId={this.props.currentQuestionIndex} letter={alternatives[i]} answer={this.props.currentQuestion.listOfAnswers[i].Answer}/>)

        }

      } else {


      }



    return(
      <div className='answersbox'>
       <ul style={{padding:'0'}}>
         {AnswerList}
      </ul>
       </div>
    )
  }
}

var mapStateToProps= function(state){



      return {
        currentQuestion:state.currentQuestion,
        currentQuestionIndex:state.currentQuestionIndex,
        answerPoints:state.answerPoints,
        selectedAnswerPoints:state.selectedAnswerPoints
      }
}


var AnswersBoxContainer= connect(mapStateToProps)(AnswersBox)

export default AnswersBoxContainer
