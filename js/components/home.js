require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import {connect} from 'react-redux';
import SignUpContainer from './sign-up.js'
import SignInBoxContainer from './signinbox.js'
import FeaturedContainer from './featured.js'
import SignInContainer from './sign-in.js'

var logInOpen=false;
var view='.tagLine';
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


export class Home extends React.Component{

  constructor(props){
    super(props)


    this.goHome= this.goHome.bind(this);
    this.goTo= this.goTo.bind(this);
    this.signIn= this.signIn.bind(this);
    this.facebooklogin= this.facebooklogin.bind(this);
    this.showLogIn = this.showLogIn.bind(this);
    this.closeLogIn= this.closeLogIn.bind(this);
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

  facebooklogin(){
    console.log('login in ');
     window.location.href='/auth/facebook';
     /*
     1. if facebook log in successful , redirect to user page
     2. if fail, sing up page*/
  }

  closeLogIn(){

  }

  showLogIn(){


  }

  signIn(){

      hideQuiz();
      showSignIn();
  }

  goHome(){

           window.location.href='/';
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


   <div className="diagonal-line-1"></div>
     <div className="diagonal-line-2"></div>
      <div className="diagonal-line-3"></div>

    	<div className="welcome-message-container">

        <div className="welcome-message">
              <h1>Looking for a gift?</h1>
                <h1>We got it.</h1>

                <button>here</button>

                <div className="tag-line">
              <h1><span className="pink-font">#givagift#</span> your go-to gift app.</h1>
                </div>
        </div>

        <div className="welcome-gift-image"></div>




      </div>





<div  className="whatwedo">


						<div className="whatwedo-left">

                  <div className="part1">Say GoodBye to Akward!  </div>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emoji_u1f601.svg/2000px-Emoji_u1f601.svg.png"></img>
                  <br></br>
                  <p>We have put together for you the best gift selection so you don't need to worry about what to get for your friend's birthday!</p>
                  <br></br>
                  <button type="button" name="button">		<h3>Take a look!</h3></button>

                  </div>


                  <div className="whatwedo-right">

                  <div className="field" id="#login">

                  <SignInContainer/>

							</div>
              </div>
 </div>






        <div className="affiliate-section">

            <h1>Choose from over 200 million products from the great Amazon store.</h1>

            <p> By participating in the Amazon Services LLC Associates Program , Givagift is able to provide an immense variety of products to choose from!</p>

            <div className="products">

        </div>


</div>



{/**
 *

     <div className="firstRow">

                 <div className="startquiz">

                       <i className="fa fa-check-square-o" aria-hidden="true"></i>
                       <h1>
                       Take this short quiz and let us help you find an awesome gift!
                       </h1>



                       <button onClick={this.goToQuiz} >Start GivaQuiz</button>
                 </div>
   </div>


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

   var HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
