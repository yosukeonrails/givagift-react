    var React = require('react');
    import cssStyle from '../css-variables.js';
    var orange='#ff7733';
    import {connect} from 'react-redux';
    import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
    import SignInContainer from './sign-in.js'
    import {push} from 'react-router-redux'
    import {hashHistory} from 'react-router'
    import FooterContainer from './footer.js'
var signUpMode='block';
var imageUrl=''
var username=''

var layOut={
  logInOpen:false,
  optionOpen:false
}


var loggedMode='none';
var optionMode='none';

export class App extends React.Component{

  constructor(props){
    super(props);

      this.showLogIn= this.showLogIn.bind(this);
      this.closeLogIn= this.closeLogIn.bind(this);
       this.props.dispatch(getFacebookUser());
       this.goToSignup = this.goToSignup.bind(this);
       this.openOptions= this.openOptions.bind(this);
       this.logOut= this.logOut.bind(this);
      this.goLink= this.goLink.bind(this);
  }

  goToSignup(){
    console.log('going to sign up ');
    hashHistory.push('/signup')
  }

  goLink(e){

           window.location.href= e.target.id;
  }

  closeLogIn(){

    var dis=this;

    $('.dark-blurr').animate({opacity:'0'}, function(){
    $('.dark-blurr').css("display", "none");

    layOut.logInOpen = false;

    dis.props.dispatch(layOutState(layOut));

  });

  }

  logOut(){

       this.props.dispatch(logOut()).then(function(){
         window.location.href='/';
       })
  }

  openOptions(){

        console.log(this.props);
        var dis=this;
        if(this.props.layOutState.optionOpen === false){

          $('.profile-option').css("display", "block");
          $('.profile-option').animate({opacity:'1'});

          layOut.optionOpen = true;
          this.props.dispatch(layOutState(layOut));

        }

        else

        {
          console.log('hiding log in ');

          $('.profile-option').animate({opacity:'0'},  function(){
          $('.profile-option').css("display", "none");

          layOut.optionOpen = false;

          dis.props.dispatch(layOutState(layOut));

        });

      }

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

    }

    else

    {
      console.log('hiding log in ');

      $('.dark-blurr').animate({opacity:'0'}, function(){
      $('.dark-blurr').css("display", "none");

      layOut.logInOpen = false;

      dis.props.dispatch(layOutState(layOut));

    });

  }
}
  render () {

    if(this.props.mode==='signup'){
        signUpMode='none';
    }


    if(this.props.loggedUser){
    imageUrl= "https://graph.facebook.com/"+this.props.loggedUser.facebookId+"/picture?width=800&height=800";
    username= this.props.loggedUser.username
        signUpMode='none';
        loggedMode='block';
    }

    if(this.props.user || this.props.loggedUser){
          console.log('now with user!');
            signUpMode='none';
              loggedMode='block';
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
                <h2 onClick={this.goLink} id="/">Givagift</h2>


                <div  style={{display:signUpMode}} className="signin">
                <button onClick={this.showLogIn} ><h3>Log In</h3></button>
                <button onClick={this.goToSignup}><h3>Sign Up</h3></button>
                </div>

                <div  style={{display:loggedMode}} className='logged-header'>
                    <img src={imageUrl}></img>
                    <h1 onClick={this.openOptions} > {username}</h1>
                    <i onClick={this.openOptions}  className="fa fa-caret-down" aria-hidden="true"></i>

                </div>

                <div  onMouseLeave={this.openOptions}  className="profile-option" >

                  <div  className="option-container">
                <button onClick={this.openOptions}  ><h1 onClick={this.goLink}  id="/#/dashboard" >Dashboard</h1></button>
                  <hr></hr>
                <button><h1 onClick={this.logOut}   ><i className="fa fa-sign-out" aria-hidden="true"></i>Log Out</h1></button>
                </div>
                </div>

        </div>

          <div className="progress-tracker"> tracker</div>


          <div >
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
     layOutState:state.layOutState,
     mode:state.mode,
     loggedUser:state.loggedUser
   }
}

var AppContainer= connect(mapStateToProps)(App)

module.exports = AppContainer;
