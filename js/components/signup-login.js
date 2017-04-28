
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

export class SignupLogin extends React.Component {

    constructor(props){
      super(props);

      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChangeEmail=this.handleChangeEmail.bind(this);
      this.handleChangePassword=this.handleChangePassword.bind(this);
    }



    handleSubmit(event){

      event.preventDefault();

      let signUpData= this

      this.props.dispatch(LogInUser(this.state)).then(function(){


          if(signUpData.state.username){

              hashHistory.push('/userdashboard');
          }

      });


    }

    handleChangeEmail(event){

      this.setState({username:event.target.value});

    }

    handleChangePassword(event){

      this.setState({password:event.target.value});
    }

      render(){

   var moveHand= function(){
     $('#handRight').animate({ paddingLeft: '10px'});
           $('#handRight').animate({ paddingLeft: '0px'});
           $('#handRight').animate({ paddingLeft: '10px'});
                 $('#handRight').animate({ paddingLeft: '0px'});
   };

    moveHand();
        setInterval(function(){
          moveHand();
}, 5000);



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

    <div  className="sign_in height drop fadeinfast">

    <div style={{
    marginTop:'30px',
    width:'600px',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:'20px'}}>

    <div className="login-request">
          <h1>Log In with facebook!</h1>
      <i style={{marginBottom:"20px"}}  className="fa fa-facebook-square" aria-hidden="true"></i>
       <a href="/auth/facebook"><div ><i id="handRight" style={{color:cssStyle.light_black}} className="fa fa-hand-o-right" aria-hidden="true"></i><span><h1> here</h1></span></div> </a>

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

var SignUpLoginContainer= connect(mapStateToProps)(SignupLogin);



export default SignUpLoginContainer;
