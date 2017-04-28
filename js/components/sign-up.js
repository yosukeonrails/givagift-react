
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


export class SignUp extends React.Component {

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

          var sign_in= {

          fontFamily:cssStyle.font4,
          fontSize: "16px",
          backgroundColor: cssStyle.white,
          width: "600px",
          height:"550px",
          border:"3px solid"+cssStyle.pink,
          borderRadius:'2pc',
          color:cssStyle.light_black,
          marginTop:"50px",
          marginLeft:"auto",
          marginRight:"auto"
          };

          var  h1Style= {
          fontSize:'50px',
          fontFamily: cssStyle.baloo,
          textAlign: "center"

          };


          var  h2Style= {
          fontSize:'30px',
          fontFamily: cssStyle.font3,
          textAlign: "center"
          };

          var buttonDiv={
          height:'400px',
          width:'700px'
          };

          var buttonStyle= {
          fontSize:'17px',
          width: "200px",
          height:"40px",
          display:'block',
          backgroundColor: cssStyle.pink,
          border: "0px",
          borderRadius:"5px",
          fontFamily:cssStyle.baloo,
          color:cssStyle.white,
          marginLeft:'auto',
          marginRight:'auto',
          marginTop:'30px'
          };

        return(

    <div style={sign_in}>

    <div style={{
    marginTop:'30px',
    width:'600px',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'20px'}}>

    <form onSubmit={this.handleSubmit} >

     <h4 style={{fontSize:'30px',textAlign:'center'}}> SignUp</h4>

    <h4 style={{fontSize:'20px', marginLeft:'30px',  color:cssStyle.light_black }}>Username:</h4>
    <input  onChange={this.handleChangeEmail} style={{ color:'black',marginLeft:'30px', width:'500px'}} type="text" name="name" id="login-email-input" placeholder="ex:CanadianPilot1234" required/>

    <h4 style={{fontSize:'20px',  color:cssStyle.light_black , marginLeft:'30px'}}>Password:</h4>
    <input  onChange={this.handleChangePassword} style={{ color:'black', width:'500px', marginLeft:'30px'}} type="password" name="name" placeholder="ex:gitin123" id="login-password-input" required/>

    <h4 style={{fontSize:'20px',  color:cssStyle.light_black , marginLeft:'30px'}}>Confirm Password:</h4>
    <input  onChange={this.handleChangeConfirmation} style={{ color:'black', width:'500px', marginLeft:'30px'}} type="password" name="name" placeholder="ex:gitin123" id="login-password-input" required/>

    <div style={alert}>
     <h4 style={{fontSize:'15px',color:cssStyle.white, textAlign:'center' }}> Confirm your password one more time. </h4>
     </div>

      <input type="submit"  style={buttonStyle} value="Create Account"/>
    </form>
      <button style={buttonStyle}>Guest Log In</button>
    </div>

    <div style={{
    marginTop:'30px',
    width:'400px',
    marginLeft:'auto',
    marginRight:'auto'}}>

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
