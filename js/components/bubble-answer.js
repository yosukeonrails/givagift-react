

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import cssStyle from '../css-variables.js'
import {selectAnswer} from '../actions/index.js'


export class BubbleAnswer extends React.Component {
  constructor(props){
    super(props);
      this.selectedAnswer= this.selectedAnswer.bind(this);

  }

  selectedAnswer(){


       var answerInfo= {

              answerN:this.props.answerId,
              questionN:this.props.questionId,
              points:this.props.points,
       };

     this.props.dispatch(selectAnswer(answerInfo));

  }


  render(){

    var bubbleWidth= '150px';
    var bubbleHeight= '150px';



var selectedCSS='answerButton';

      if(this.props.answerSelected===true){
        if( this.props.answerId == this.props.selectedAnswerInfo.answerN && this.props.questionId == this.props.selectedAnswerInfo.questionN ){
              selectedCSS='selectedAnswerButton';
        } else {
           selectedCSS='answerButton';
        }
      }

    return(

      <div onClick={this.selectedAnswer} >



    <div style={{height:bubbleHeight, width:bubbleWidth}} className="answer-bubble">
            <div className="answer-tag-top">
            </div>
            <div style={{BorderBottomLeftRadius:bubbleHeight, BorderBottomRightRadius:bubbleWidth}} className="answer-tag-bottom">
            <h1>Kitchen</h1>
            </div>
    </div>


       </div>

    )
  }
}



var mapStateToProps= function(state){



      return {
        currentQuestion:state.currentQuestion,
        selectedAnswerInfo:state.selectedAnswerInfo,
        answerSelected:state.answerSelected

      }
}


var BubbleAnswerContainer= connect(mapStateToProps)(BubbleAnswer)

export default BubbleAnswerContainer;
