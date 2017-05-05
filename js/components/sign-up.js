
var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
import {connect} from 'react-redux';
import cssStyle from '../css-variables.js';
var Link = router.Link;
import {SignUpUser, LogInUser, changeMode} from '../actions/index.js';
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
var alert;


export class SignUp extends React.Component {

    constructor(props){
      super(props);

      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChangeEmail=this.handleChangeEmail.bind(this);
      this.handleChangePassword=this.handleChangePassword.bind(this);
      this.handleChangeConfirmation=this.handleChangeConfirmation.bind(this);
    }

    componentDidMount(){
      this.props.dispatch(changeMode('signup'));
      console.log('it went ');
    }


      facebooklogin(){
        console.log('login in ');
         window.location.href='/auth/facebook';
         /*
         1. if facebook log in successful , redirect to user page
         2. if fail, sing up page*/
      }

    handleSubmit(event){

      event.preventDefault();

        if( this.state.password !== this.state.confirmation){

          this.setState({same:false});

        } else {

          this.setState({same:true});

           let signUpData=this;
          this.props.dispatch(SignUpUser(this.state)).then(function(){

            signUpData.props.dispatch(LogInUser(signUpData.state)).then(function(){


                  if(signUpData.state.username){



                        hashHistory.push('/userdashboard');

                  }
            });
          });


        }
    }

    handleChangeEmail(event){
      this.setState({username:event.target.value});

    }
    handleChangePassword(event){
      this.setState({password:event.target.value});

    }
    handleChangeConfirmation(event){
      this.setState({confirmation:event.target.value});

    }

      render(){


        return(

       <div>


     	<div className="sign-up">

     	<h1> Sign Up</h1>
     	<hr></hr>
     					<button  id="facebook-button" onClick={this.facebooklogin}  name="button">Sign Up with Facebook</button>

     	<h1>or</h1>

     	<p>Plese fill in the fields.</p>
     	<div className="sign-up-field-container">

     		<div className="first-name">
     				<label >First Name</label>
     				<input  onChange={this.handleChangeUsername}  type="username" className=""></input>
     				</div>


     				<div className="last-name">
     				<label >Last Name</label>
     				<input  onChange={this.handleChangeUsername}  type="username" className=""></input>
     				</div>

     				<hr></hr>
     					<div className="email">
     					<label >Username</label>
     					<input  onChange={this.handleChangeUsername}  type="username" className=""></input>
     					</div>

     					<div  className="password">
     					<label >Password</label>
     					<input onChange={this.handleChangePassword} type="password" className=""></input>
     					</div>

     					<div  className="password">
     					<label >Confirm Password</label>
     					<input onChange={this.handleChangePassword} type="password" className=""></input>
     					</div>




     					<hr></hr>
     					<button  id="submit-button" type="submit"  onClick={this.handleSubmit} name="button"> Submit</button>



     	</div>

     	</div>

       </div>
        );
      }
}

var mapStateToProps= function(state){
  return {
  contents:state.contents,
  styles:state.cssStyle,
  user:state.user
  }
}

var SignUpContainer= connect(mapStateToProps)(SignUp);


export default SignUpContainer;
