
var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
import cssStyle from '../css-variables.js';
import {connect} from 'react-redux';
var Link = router.Link;
import {LogInUser, logMockUser} from '../actions/index.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'

export class Login extends React.Component {

    constructor(props){
      super(props);

      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChangeEmail=this.handleChangeEmail.bind(this);
      this.handleChangePassword=this.handleChangePassword.bind(this);

    }



    handleSubmit(event){

      event.preventDefault();

          let signUpData= this;

          this.props.dispatch(logMockUser('guest123')).then(function(){

          hashHistory.push('/userpage');


      });


    }

    handleChangeEmail(event){

      this.setState({facebookId:event.target.value});

    }

    handleChangePassword(event){

      this.setState({facebookId:event.target.value});
    }

      render(){



        return(

    <div className="login_new drop fadeinslow">

    <div>

    <form onSubmit={this.handleSubmit} >
        <h1> Sign In </h1>
        <i className="fa fa-sign-in" aria-hidden="true"></i>




      <input className="submit-button" type="submit" value="Guest Login"/>
    </form>
    <a href="/auth/facebook">  <button className="facebook" onClick={this.facebookLogin}>Facebook Login</button> </a>
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
  user:state.user
  }

}

var LoginContainer= connect(mapStateToProps)(Login);



export default LoginContainer;
