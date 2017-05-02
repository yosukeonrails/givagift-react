
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


export class SignIn extends React.Component {

    constructor(props){
      super(props);

      this.handleChangeUsername= this.handleChangeUsername.bind(this);
      this.handleChangePassword= this.handleChangePassword.bind(this);
      this.handleSubmit= this.handleSubmit.bind(this);
      this.facebooklogin= this.facebooklogin.bind(this);

        }


        facebooklogin(){
          console.log('login in ');

           window.location.href='/auth/facebook';
           /*
           1. if facebook log in successful , redirect to user page
           2. if fail, sing up page*/
        }

      handleChangeUsername(e){
        this.setState({username:e.target.value});
      }

      handleChangePassword(e){
        this.setState({password:e.target.value});
      }

      handleSubmit(){

          var data= this.state;
          this.props.dispatch(LogInUser(data)).then(function(){
            console.log('then happened');
            hashHistory.push('/dashboard');
          });

      }

      render(){

        return(
          <div>

          <div className="field-container">

                  <h1> Log In</h1>
                  <div className="email">
                  <label >Username</label>
                  <input  onChange={this.handleChangeUsername}  type="username" className=""></input>
                  </div>
                  <div  className="password">
                  <label >Password</label>
                  <input onChange={this.handleChangePassword} type="password" className=""></input>
                  </div>
                  <hr></hr>
                  <button  id="submit-button" type="submit"  onClick={this.handleSubmit} name="button"> Submit</button>

                  <button  id="facebook-button" onClick={this.facebooklogin}  name="button"> Log in with Facebook</button>

          </div>

          </div>
        );
      }
}




var mapStateToProps= function(state){
  return{
    contents:state.contents,
    styles:state.cssStyle,
    user:state.user
  }
}

var SignInContainer= connect(mapStateToProps)(SignIn);


export default SignInContainer;
