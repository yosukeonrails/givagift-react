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
import {layOutState , changeRedirect} from '../actions/index.js'
var logInOpen=false;
var view='.tagLine';
var nomargin= {
  margin:0,
  padding:0
};

var layOut={
  logInOpen:false,
  optionOpen:false
}


var hideSignIn= function(){
      $('.field-container').animate({opacity:'0'}, 300, function(){
          $('.sign-in').animate({height:'0px'}, 500 , function(){
          $('.sign-in').css('display', 'none');
      });

          $('.sign-in').css('padding','0px');
          $('.field-container').css('display' , 'none');
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

    this.goTo= this.goTo.bind(this);
    this.showLogIn = this.showLogIn.bind(this);
    this.validateUser= this.validateUser.bind(this);
  }


  validateUser(){

      if(this.props.loggedUser){

             window.location.href='/#/starter';

            // this.props.dispatch( postGiftForm(this.props.postGiftForm) );

      } else {

          this.showLogIn()
          this.props.dispatch( changeRedirect('starter') );
          this.setState({redirectNow:true})

      }

  }

    showLogIn(){

        var dis=this;

          if(this.props.layOutState.logInOpen === false){

                $('.dark-blurr').css("display", "block");
                $('.dark-blurr').animate({opacity:'1'});

                layOut.logInOpen = true;
                this.props.dispatch(layOutState(layOut));
          }

        else  {
                  $('.dark-blurr').animate({opacity:'0'}, function(){
                  $('.dark-blurr').css("display", "none");
                  layOut.logInOpen = false;
                  dis.props.dispatch(layOutState(layOut));
                    });
                }

        }

          goTo(link){

              hashHistory.push(link)
          }

    render () {

      var element;
      $(document).scrollTop();

      return(


    <div className="landing-page">

    	<div className="welcome-message-container">

                  <div className="welcome-message">

                      <div className="welcome-message-text">

                        <h1>Looking for a gift?</h1>
                          <h1>we got it.</h1>

                          <button onClick={this.validateUser}> here </button>

                            <div className="tag-line">
                          <h1><span className="pink-font">#givagift#</span> your go-to gift app.</h1>
                            </div>


                      </div>



                                  <div className="diagonal-line-1"></div>
                                  <div className="diagonal-line-2"></div>
                                  <div className="diagonal-line-3"></div>

                  </div>

        <div className="welcome-gift-image"></div>

      </div>

      <div className="home-instruction-1">

          <div className="home-instruction-text">
            <h1>#1 Tell Us About Your Friend.</h1>

          <p> We find the best fitting gift by , asking you exactly how that person is like.</p>
          </div>

          <div className="home-instruction-image" id="givagift-example-1">
          </div>

      </div>


      <div className="home-instruction-2">

        <div className="home-instruction-image" id="givagift-example-2">
        </div>

                <div className="home-instruction-text">

                <h1>#2 We bring you the best results!</h1>

                <p> Choose from over 200 million selection from the great Amazon store.</p>
                </div>
      </div>


                <div  className="whatwedo">


                						<div className="whatwedo-left">

                                  <div className="part1">Say GoodBye to Akward!  </div>
                                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emoji_u1f601.svg/2000px-Emoji_u1f601.svg.png"></img>
                                  <br></br>
                                  <p>We have put together for you the best gift selection so you don't need to worry about what to get for your friend's birthday!</p>
                                  <br></br>
                                  <button type="button" name="button"  onClick={()=>{this.goTo('/starter')}}>		<h3>Find Gift Now!</h3></button>

                                  </div>


                                  <div className="whatwedo-right">

                                  <div className="field" id="#login">

                                  <SignInContainer/>

                							</div>
                              </div>
                 </div>

        <div className="bottom-diagonal-container">


                                             <div className="bottom-diagonal-line-1"></div>
                                             <div className="bottom-diagonal-line-2"></div>
                                             <div className="bottom-diagonal-line-3"></div>
        </div>





        <div className="affiliate-section">
            <h1>Choose from over 200 million products from the great Amazon store.</h1>

            <p> By participating in the Amazon Services LLC Associates Program , Givagift is able to provide an immense variety of products to choose from!</p>

            <div className="products">
        </div>


      </div>

  </div>
    );
  }
}


  var mapStateToProps= function(state){

        return {
          loggedUser:state.loggedUser,
          layOutState:state.layOutState,
        }
  }

   var HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
