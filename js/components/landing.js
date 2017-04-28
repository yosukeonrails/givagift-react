require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
import {connect} from 'react-redux';
import SignUpContainer from './sign-up.js'
import SignUpLoginContainer from './signup-login.js'
import UserSignUpContainer from './user-signup.js'
import LoginContainer from './login.js'
import QuizInfoContainer from './quizinfo.js'
import SignInBoxContainer from './signinbox.js'
import FeaturedContainer from './featured.js'

var view='.tagLine';
var viewModes=['.tagLine', '.whatwedo', '.loginbox','.affiliate','.giva-sign-up','.givaquiz'];
var nomargin= {
  margin:0,
  padding:0
};



var hideSignIn= function(){
      $('.field-container').animate({opacity:'0'}, 300, function(){
          $('.sign-in').animate({height:'0px'}, 500 , function(){
          $('.sign-in').css('display', 'none');
      });

          $('.sign-in').css('padding','0px');
          $('.field-container').css('display' , 'none');
      });
};

var showAffiliate= function(){
  $('.affiliates').css('display', 'block');
  $('.affiliates').animate({height:'500px'},500, function(){

  $('.affiliates p').css('display' , 'block');
  $('.affiliates p').animate({opacity:'1'});
  });
};

var showSignIn= function(){
        $('.sign-in').css('display', 'block');
        $('.sign-in').animate({height:'500px'},500, function(){
        $('.sign-in').css('padding','50px');
        $('.field-container').css('display' , 'block');
        $('.field-container').animate({opacity:'1'});
    });
};


var hideQuiz= function(){

  $('.quizcontainer').css("display","none");
  $('.banner').css("height" , "100vh");

};

export class LandingPage extends React.Component{

  constructor(props){
    super(props)


    this.goHome= this.goHome.bind(this);
    this.goTo= this.goTo.bind(this);
    this.goToQuiz= this.goToQuiz.bind(this);
    this.signIn= this.signIn.bind(this);
  }

componentDidMount(){

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

  $("html, body").animate({ scrollTop: $(".header").offset().top }, 1000);
}

  signIn(){

      hideQuiz();
      showSignIn();
  }

  goHome(){

        hideSignIn();
        hideQuiz();


        $('.letsparty').css("display", "block");
        $('.quizcontainer').finish().animate({opacity:'0'},100, function(){

        $('.letsparty').animate({opacity:'1'},100, function(){
        $('.letsparty').finish().animate({top:'0%'}, 1000);
        });

        });

          $("html, body").animate({ scrollTop: $(".header").offset().top }, 1000);
  }

  goToQuiz(){




        hideSignIn();
        $('.letsparty').finish().animate({top:'70%'}, 500 , function(){
        $('.letsparty').finish().animate({opacity:'0'}, 1000);
        $('.letsparty').css("display", "none");




        $('.quizcontainer').css("display", "block");
        $('.quizcontainer').animate({opacity:'1'},100);
        $('.quizcontainer').animate({top:'0%'}, 100);

        $('.quiz-information').animate({opacity:'1'},200 , function(){
                $('.quiz-content').animate({opacity:"1"}, 200);
  $("html, body").animate({ scrollTop: $(".quiz-information").offset().top }, 1000);
        });
      });

    $('.banner').css("height" , "100vh");




    }

    goTo(event){

          view=event.target.id;
          var element;

    for(var i=0 ; i<viewModes.length; i++){

        if(view == viewModes[i]){
          element=$(viewModes[i]);

              element.css("display", "block");

        }  else {

            element=$(viewModes[i]);
            element.css("display", "none");


        }

    }

      this.setState({
        random:'random'
      });
    }

    render () {
  var element;

      return(

    <div className="landing-page">


    	<div className= "banner">

            <div className="header">
            <h2 onClick={this.goHome}>Givagift</h2>

                    <div className="signin">
                    <button onClick={this.signIn}><h3>Sign In</h3></button>
                    <button onClick={this.goToQuiz}><h3>GivaQuiz</h3></button>
                    <button onClick={this.whatwedo} ><a href="#whatwedo"><h3>WhatWeDo</h3></a></button>
                    <button ><a href="#affiliates"><h3>Affiliates</h3></a></button>
                    </div>
            </div>





        <div  className="quizcontainer">
          <QuizInfoContainer/>
        </div>



        <div  className="sign-in-container">
          <SignInBoxContainer/>
        </div>

    		<h1 style={{display:'block'}} className="letsparty"> Life is a Gift .</h1>


        <div className="explanation">
                  <h2> Looking for a gift?</h2>
                    <button type="button" name="button">		<h3>Find the perfect gift here!</h3></button>

                </div>


    	</div>




<div  className="whatwedo">


						<div className="whatwedo-left">

									<div className="part1">We are here to save you from akward situations..</div>
									<br></br>
									<p>We have put together for you the best gift selection so you don't need to worry about what to get for your friend's birthday!</p>
									<br></br>
									<button type="button" name="button">		<h3>Take a look!</h3></button>

						</div>


							<div className="whatwedo-right">

									<div className="field-container">

														<h1> Log In</h1>
														<div className="email field">
															<label >Email</label>
															<input type="text" className=""></input>
														</div>
														<div  className="password field">
															<label >Password</label>
															<input type="password" className=""></input>
														</div>
													  <hr></hr>
												   	<button type="submit" name="button"> Submit</button>

													  <button style={{backgroundColor:'#3B5998'}}  onClick={this.facebooklogin} name="button"> Log in with Facebook</button>
									</div>
							</div>

 </div>






        <div className="affiliate-section">

            <h1>Choose from over 200 million products from the great Amazon store.</h1>

            <p> By participating in the Amazon Services LLC Associates Program , Givagift is able to provide an immense variety of products to choose from!</p>

            <div className="products">

        </div>


</div>


                 <div className="featured">

                 <FeaturedContainer/>
                 </div>


    <div className="firstRow">

                <div className="startquiz">

                      <i className="fa fa-check-square-o" aria-hidden="true"></i>
                      <h1>
                      Take this short quiz and let us help you find an awesome gift!
                      </h1>



                      <button onClick={this.goToQuiz} >Start GivaQuiz</button>
                </div>
  </div>

{/**
 *

 <div id="affiliates" className="affiliates">
 <i className="fa fa-amazon" aria-hidden="true"></i>
   <p>

   Givagifts is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com. Amazon, the Amazon logo, AmazonSupply, and the AmazonSupply logo are trademarks of Amazon.com, Inc. or its affiliates.
   If you require any more information or have any questions about our site&#x27;s disclaimer, please feel free to contact us at givagifts-support@gmail.com .
   </p>

 </div>

 */}





  </div>
    );
  }
}


  var mapStateToProps= function(state){

        return {

        }
  }

   var LandingPageContainer= connect(mapStateToProps)(LandingPage);

export default LandingPageContainer;
