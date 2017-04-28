
var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
import {connect} from 'react-redux';
import cssStyle from '../css-variables.js';
var Link = router.Link;
import {SignUpUser, LogInUser} from '../actions/index.js';
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
var alert;


export class UserSignUp extends React.Component {

    constructor(props){
      super(props);

      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChangeEmail=this.handleChangeEmail.bind(this);
      this.handleChangePassword=this.handleChangePassword.bind(this);
      this.handleChangeConfirmation=this.handleChangeConfirmation.bind(this);
    }

    handleSubmit(event){

      event.preventDefault();

        if( this.state.password !== this.state.confirmation){

          this.setState({same:false});
            //password is not the same show wwarning//


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

    <div >

    <div className="giva-sign-up">

    <form onSubmit={this.handleSubmit} >

     <h1> SignUp</h1>

    <h4 >Username:</h4>
    <input  onChange={this.handleChangeEmail}  type="text" name="name" id="login-email-input" placeholder="ex:CanadianPilot1234" required/>

    <h4>Password:</h4>
    <input  onChange={this.handleChangePassword}  type="password" name="name" placeholder="ex:gitin123" id="login-password-input" required/>

    <h4 >Confirm Password:</h4>
    <input  onChange={this.handleChangeConfirmation} type="password" name="name" placeholder="ex:gitin123" id="login-password-input" required/>

  <div>
    <button className ="btn btn-primary" type="submit">Create User</button>
    </div>
    </form>

    </div>

    <div>

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

var UserSignUpContainer= connect(mapStateToProps)(UserSignUp);


export default UserSignUpContainer;
