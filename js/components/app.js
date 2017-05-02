var React = require('react');
 import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState } from '../actions/index.js'
import SignInContainer from './sign-in.js'
var layOut={
  logInOpen:false
}

export class App extends React.Component{

  constructor(props){
    super(props);

      this.showLogIn= this.showLogIn.bind(this);
      this.closeLogIn= this.closeLogIn.bind(this);
       this.props.dispatch(getFacebookUser());
  }

  closeLogIn(){

    var dis=this;

    $('.dark-blurr').animate({opacity:'0'}, function(){
    $('.dark-blurr').css("display", "none");

    layOut.logInOpen = false;

    dis.props.dispatch(layOutState(layOut));

  });

  }

  showLogIn(){

    console.log(this.props);
    var dis=this;
    if(this.props.layOutState.logInOpen === false){
      console.log('showing log in ');

      $('.dark-blurr').css("display", "block");
      $('.dark-blurr').animate({opacity:'1'});

      layOut.logInOpen = true;
      this.props.dispatch(layOutState(layOut));

    }  else {
      console.log('hiding log in ');
      $('.dark-blurr').animate({opacity:'0'}, function(){
      $('.dark-blurr').css("display", "none");

      layOut.logInOpen = false;

      dis.props.dispatch(layOutState(layOut));

    });

  }
}
  render () {



    if(this.props.user){
          console.log('now with user!');

    }


    return(

      <div className='main'>


        <div className="dark-blurr">

          <div className="login-window">

          <i  onClick={this.closeLogIn} className="fa fa-times-circle-o" aria-hidden="true"></i>
            <SignInContainer/>
          </div>

        </div>

        <div className="header">
        <h2 onClick={this.goHome}>Givagift</h2>


                <div className="signin">
                <button onClick={this.showLogIn} ><h3>Log In</h3></button>
                <button ><h3>Sign Up</h3></button>
                </div>
        </div>

          <div>
            {this.props.children}
          </div>

      </div>

    );
  }
}


var mapStateToProps= function(state){

  console.log(state);
   return {
     user:state.user,
     layOutState:state.layOutState
   }
}

var AppContainer= connect(mapStateToProps)(App)

module.exports = AppContainer;
