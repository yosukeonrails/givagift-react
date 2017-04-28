
var React = require('react');
var ReactDOM = require('react-dom');
import cssStyle from '../css-variables.js'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {saveListInfo} from '../actions/index.js'
import OutterboxContainer from './outterbox.js'
var quizDisplay='none';
var elementArray=['first-question','second-question' , 'third-question' ,'fourth-question'];
var questionNumber= 0;
var resizeRatio=1;
  $(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	        $('html, body').animate({
	          scrollTop: target.offset().top
	        }, 1000);
	        return false;
	      }
	    }
	  });
	});

var ratioResize=function(){


  if(window.screen.width < 600){

    resizeRatio=1.5;

    return;
  }

};

  window.onresize = function() {

      if($(window).width() < 600){


        return;

      }

      resizeRatio=1;
  };

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

  var minify= function(div){

      $(div+' '+"h1").animate({fontSize:(35*resizeRatio)+'px'});
      $(div+' '+"select").animate({fontSize:(35*resizeRatio)+'px'});
      $(div).animate({opacity:'0.9'});
      $(div+' '+"label").animate({fontSize:(40*resizeRatio)+'px'});
      $(div+' '+"input").animate({fontSize:(40*resizeRatio)+'px'});

      $(div+' '+"p").animate({fontSize:(40*resizeRatio)+'px'});
  };

  var maximize= function(div){

       $(div+' '+'p').animate({fontSize:(40*resizeRatio)+'px'});
       $(div+' '+'h1').animate({fontSize:(40*resizeRatio)+'px'});
      $(div+' '+"select").animate({fontSize:(50*resizeRatio)+'px'});
      $(div).animate({opacity:'1'});
      $(div+' '+"input").animate({fontSize:(50*resizeRatio)+'px'});
      $(div+' '+"label").animate({fontSize:(50*resizeRatio)+'px'});
  };


  var stopAnimation= function(div){

       $(div+' '+'h1').stop();
      $(div+' '+"select").stop();
      $(div).stop();
      $(div+' '+"input").stop();
      $(div+' '+"label").stop();

  };


export class QuizInfo extends React.Component {

  constructor(props){
       super(props);



        quizDisplay='none';
          this.goHome= this.goHome.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleRelationship= this.handleRelationship.bind(this);
      this.handleName= this.handleName.bind(this);
      this.handleMonth= this.handleMonth.bind(this);
      this.handleDay= this.handleDay.bind(this);
      this.handleAge= this.handleAge.bind(this);
      this.handleGender= this.handleGender.bind(this);
      this.goToQuiz= this.goToQuiz.bind(this);
      this.goNext= this.goNext.bind(this);
      this.keyDown= this.keyDown.bind(this);
      this.selectSection= this.selectSection.bind(this);
            this.deselectSection= this.deselectSection.bind(this);
  }

  componentDidMount(){


  }

  componentWillMount(){

    this.setState({
        name:'',
        age:'',
        gender:'she is',
        relationship:'friend',
        month:0,
        day:0
    });



  }

  deselectSection(event){

    stopAnimation('.'+event.target.id);

    var element='.'+event.target.id;
          minify(element);

  }

  selectSection(event){

    ratioResize();

    stopAnimation('.'+event.target.id);
        var element='.'+event.target.id;
              maximize(element);

  }

  goNext(){


  }

  keyDown(e){

  }

  goToQuiz(){

  }

  handleRelationship(event){

      this.setState({
        relationship:event.target.value
      });

  }

  handleGender(event){

      this.setState({
        gender:event.target.value
      });

  }

  handleAge(event){

      this.setState({
        age:event.target.value
      });



  }

  handleName(event){

      this.setState({
        name:event.target.value
      });



  }

  handleMonth(event){

      this.setState({
        month:event.target.value
      });

  }

  handleDay(event){

      this.setState({
        day:event.target.value
      });

  }

goHome(){
  hideSignIn();
  hideQuiz();
  quizDisplay='none';
  var currentElement=  $('.'+elementArray[questionNumber]);

  currentElement.css('display', 'none');
  questionNumber=0;

  this.setState({
    questionNumber:questionNumber
  });

  $('.first-question').css('display', 'block');
  $('.quiz-information').css('display', 'block');
  $('.letsparty').css("display", "block");
  $('.quizcontainer').finish().animate({opacity:'0'},100, function(){

  $('.letsparty').animate({opacity:'1'},100, function(){
  $('.letsparty').finish().animate({top:'0%'}, 1000);
  });

  });
  this.setState({
    quizDisplay:false
  });

}


  handleSubmit(event){


        if(event.keyCode){
          if (event.keyCode == 13) {

          }

        }


        if(questionNumber===1){
        if(this.state.name.length ===0){
        $('.error-message').css('display', 'block');

          return;
        }

        }

        if(questionNumber===2){
        if(this.state.age.length ===0){
        $('.error-message').css('display', 'block');

          return;
        }

        }



    if(this.state.questionNumber > 3 ){
      questionNumber=0;
    }


    if(this.state.questionNumber === 3){

      event.preventDefault();

      this.props.dispatch(saveListInfo(this.state));


      $('.quiz-information').css('display', 'none');


      this.setState({
      quizDisplay:true,
      questionNumber:0
      });

      $("html, body").animate({ scrollTop: $(".quizbox").offset().top }, 1000);

          return ;
    }


        $('.error-message').css('display', 'none');
      var currentElement=  $('.'+elementArray[questionNumber]);
      var nextElement=   $('.'+elementArray[questionNumber+1]);

          minify('.'+elementArray[questionNumber]);
          currentElement.css('display', 'none');

          nextElement.css('opacity', '0');
          nextElement.css('display', 'block');
          maximize('.'+elementArray[questionNumber+1]);


          this.setState({
          questionNumber:questionNumber+1
          });

            questionNumber=questionNumber+1;


        }

  render(){

    $('body').keypress(function(){

    });

      $('.quiz-information').animate({opacity:'1'},200 , function(){
              $('.quiz-content').animate({opacity:"1"}, 200);
      });

      quizDisplay='none';

    if(this.state.quizDisplay === true ){
      quizDisplay='block';

    }






    var s = '\'s';

    return(



<div className="absolute-quiz">


<div  className="quiz-information" >
<div  onClick={this.goHome} className="close-button"><i className="fa fa-times-circle" aria-hidden="true"></i> <h2>close</h2></div>
<div className="quiz-content" >


                              <div   className="quiz-form" >

         <div  className="first-question">
                                <h1>GivaQuiz</h1>
                        <p>Take this short quiz and let us help you find a perfect gift!</p>
         </div>


                                    <div  onKeyPress={this.keyDown}   onMouseOver={this.selectSection}    onMouseOut={this.deselectSection} onClick={this.selectSection}  className="second-question question" id="second-question">

                                    <label id="second-question" > My </label>
                                    <select id="second-question"  onChange={this.handleRelationship} >
                                    <option value="friend">Friend{s}</option>
                                    <option style={{ fontSize:'20px'}} value="family member">Family Memeber{s}</option>
                                    <option value="boyfriend">Boyfriend{s}</option>
                                      <option value="girlfriend">Girlfriend{s}</option>
                                    <option value="pet">Pet{s}</option>
                                    </select>
                                    <h1 id="second-question" >name is </h1>
                                    <input id="second-question" autoCorrect="off" autoComplete="off"  onChange={this.handleName} type="text"   >
                                    </input>
                                    <div className="error-message"><i className="fa fa-exclamation-circle" aria-hidden="true"></i><h1> Sorry, you need to write a name!</h1></div>
                                    </div>


                                    <div onClick={this.selectSection}    onMouseOver={this.selectSection}    onMouseOut={this.deselectSection} className="third-question question" id="third-question">
                                    <select id="third-question" onChange={this.handleGender} >
                                    <option value="she is">She is</option>
                                    <option value="he is">He is</option>
                                    <option value="it is">It is</option>
                                    </select>


                                    <input   autoCorrect="off" autoComplete="off"  id="third-question" onChange={this.handleAge} className="age" type="number" min="0" >
                                    </input>
                                    <h1 id="third-question">years old.</h1>
                                    <div className="error-message"><i className="fa fa-exclamation-circle" aria-hidden="true"></i><h1> Sorry, you need to write the age.</h1></div>
                                    </div>



                                    <div onClick={this.selectSection} onMouseOver={this.selectSection} onMouseOut={this.deselectSection} className="fourth-question question" id="fourth-question" >

                                    <h1 id="fourth-question"  > Birthday Info (optional)</h1> <br></br>
                                    <select id="fourth-question"   onChange={this.handleMonth} >
                                    <option selected value=''>--Month--</option>
                                    <option  value='1'>January</option>
                                    <option value='2'>February</option>
                                    <option value='3'>March</option>
                                    <option value='4'>April</option>
                                    <option value='5'>May</option>
                                    <option value='6'>June</option>
                                    <option value='7'>July</option>
                                    <option value='8'>August</option>
                                    <option value='9'>September</option>
                                    <option value='10'>October</option>
                                    <option value='11'>November</option>
                                    <option value='12'>December</option>
                                    </select>


                                    <input autoCorrect="off" autoComplete="off"  id="fourth-question" placeholder="day" onChange={this.handleDay} className="day" type="number" min="1" max="31" >
                                    </input>

                                    </div>

                                    <div className="startButton">
                                      <button   onClick={this.handleSubmit} name="button">Next</button>
                                    </div>


                                </div>



</div>   {/** end of quiz content **/}
</div>

<div style={{display:quizDisplay}} className= 'quiz-questions'>
  <OutterboxContainer parentMethod={this.goHome}/>
 </div>

</div>




    );
  }
}


var mapStateToProps = function(state){

      return {
        user:state.user
      }
}

   var QuizInfoContainer= connect(mapStateToProps)(QuizInfo);

   export default QuizInfoContainer;
