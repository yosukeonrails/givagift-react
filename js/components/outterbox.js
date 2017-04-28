

var React = require('react');
var ReactDOM = require('react-dom');
import QuestionContainer from './question.js';
import AnswersBoxContainer from './answersbox.js';
import {connect} from 'react-redux';
import {NextQuestion, CallAmazon, CallAmazonCalls, intializeResults, SubmitAnswerPoints, GetMax , SetQuery} from '../actions/index.js'
import cssStyle from '../css-variables.js';
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import gradeGetter from '../gradegetter.js'
import evaluator from '../evaluator.js'
import itemIndex from '../itemindex.js'
import getQueryByAge from '../getquerybyage.js';


  var hideSignIn= function(){

    $('.field-container').animate({opacity:'0'}, 300, function(){
      $('.sign-in').animate({height:'0px'}, 500 , function(){
          $('.sign-in').css('display', 'none');
      });

      $('.sign-in').css('padding','0px');
        $('.field-container').css('display' , 'none');
    });


      $("html, body").animate({ scrollTop:0});
  };

  var hideQuiz= function(){

    $('.quizcontainer').css("display","none");
    $('.banner').css("height" , "100vh");

    $('.userquiz').css("display","none");
  };

var results=['lifx','starwars','bananas'];
var callArray=[];
var ItemInfo;
var ItemsArray;
var NextButton="";

export class Outterbox extends React.Component {

        constructor(props){
          super(props);
          this.nextQuestion= this.nextQuestion.bind(this);
          this.firstQuestion= this.firstQuestion.bind(this);
        }


        firstQuestion(){


               this.props.dispatch(NextQuestion(-1));
            this.props.parentMethod();
        }

        componentDidMount(){
            $("html, body").animate({ scrollTop: $(".new_quiz").offset().top }, 1000);
        }

        nextQuestion(){



          $('.quiz-next-button').animate({opacity:'0'});
                $('.quiz-next-button').css('display' ,'hidden');
          var ArrayOfPoints=this.props.answerPoints;
          var maxpoint= Math.max(...ArrayOfPoints);

          this.props.dispatch(SubmitAnswerPoints(this.props.selectedAnswerInfo.points));
          this.props.dispatch(GetMax(maxpoint));



              if(this.props.currentQuestionIndex+1==this.props.questions.length){

              var age= parseInt(this.props.listInfo.age);

              var grade= gradeGetter(this.props.submittedPoints, this.props.maxPoints);

              var ClassN= evaluator(100, grade , itemIndex.class.length, 0 ,1);
              var SubClassNLength= itemIndex.class[ClassN].subclass.length;
              var SubClassN= evaluator( 100 , grade , SubClassNLength, 0 ,1);
              var ItemNLength= itemIndex.class[SubClassN].subclass.length;

              var ItemN= getQueryByAge( 60 , age , 0 , 1);


                var queryNumber= ClassN+''+SubClassN+''+ItemN;
                var queryNumberString=queryNumber.toString();

                    hashHistory.push('/result/'+queryNumberString);
              } else {

                 this.props.dispatch(NextQuestion(this.props.currentQuestionIndex));

               }

        }


         render(){

          if(this.props.answerSelected===true && this.props.selectedAnswerInfo.questionN == this.props.currentQuestionIndex  ){
                      $('.quiz-next-button').css('display' ,'block');
                    $('.quiz-next-button').animate({opacity:'1'});
               }



           return(

              <div className="quizbox">
                <div className="new_quiz height">
                <div onClick={ this.firstQuestion } className="close-button"><button><i className="fa fa-times-circle" aria-hidden="true"></i> <h2>close</h2></button></div>

                <div className="quiz-container">

                     <QuestionContainer/>
                     <AnswersBoxContainer/>

                    <div className="quiz-next-button"> <button className='buttonStyle' onClick={this.nextQuestion}>next</button></div>

                </div>
                 </div>
                 </div>
           );
         }
}


var mapStateToProps= function(state){

   return {
      currentQuestionIndex:state.currentQuestionIndex,
    amazonData:state.amazonData,
    questions:state.questions,
    selectedAnswerInfo:state.selectedAnswerInfo,
    answerPoints:state.answerPoints,
    submittedPoints:state.submittedPoints,
    maxPoints:state.maxPoints,
    queries:state.queries,
    answerSelected:state.answerSelected,
    listInfo:state.listInfo
   }
}

var OutterboxContainer= connect(mapStateToProps)(Outterbox)

export default OutterboxContainer;
