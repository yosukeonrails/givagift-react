
var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
import cssStyle from '../css-variables.js';
import {connect} from 'react-redux';
var Link = router.Link;
import {LogInUser} from '../actions/index.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'

export class SignInBox extends React.Component {

    constructor(props){
      super(props);

      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChangeEmail=this.handleChangeEmail.bind(this);
      this.handleChangePassword=this.handleChangePassword.bind(this);
      this.facebooklogin= this.facebooklogin.bind(this);
    }



    handleSubmit(event){

      event.preventDefault();

      let signUpData= this;

      this.props.dispatch(LogInUser(this.state)).then(function(){


          if(signUpData.state.username){

              hashHistory.push('/userdashboard');
          }

      });


    }

    facebooklogin(){

      window.location= "/auth/facebook";

    }

    handleChangeEmail(event){

      this.setState({username:event.target.value});

    }

    handleChangePassword(event){

      this.setState({password:event.target.value});
    }

      render(){


        return(

    <div>

    								<div className="sign-in w3-panel w3-card-4">
    										<div className="field-container">
    													<form>

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
    													</form>
                                <button style={{backgroundColor:'#3B5998'}}  onClick={this.facebooklogin} name="button"> Log in with Facebook</button>
    										</div>
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

var SignInBoxContainer= connect(mapStateToProps)(SignInBox);



export default SignInBoxContainer;
