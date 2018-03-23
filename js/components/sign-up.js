
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
      this.handleChange= this.handleChange.bind(this);

    }
    componentWillMount(){
      this.setState({
        emailWarning:'none',
        email:'',
         firstNameWarning:'none',
         firstName:'',
          lastNameWarning:'none',
          lastName:'',
           passwordWarning:'none',
           password:'',
            rePasswordWarning:'none',
            confirmation:''
      })
    }
    componentDidMount(){
      this.props.dispatch(changeMode('signup'));
      console.log('it went ');
      this.setState({
        same:true
       });

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

        if(this.state.firstName.length <= 1 ){

            console.log(this.state)

              this.setState({
                 firstNameWarning:'block'
              })
        }
        if(this.state.lastName.length <= 1 ){

              console.log(this.state)

              this.setState({
                 lastNameWarning:'block'
              })
        }
        if(this.state.email.length <= 1 ){

              console.log(this.state)

              this.setState({
                 emailWarning:'block'
              })
        }
        if(this.state.password.length <= 1 ){

              console.log(this.state)

              this.setState({
                 passwordWarning:'block'
              })
        }
        if(this.state.confirmation.length <= 1 ){

              console.log(this.state)

              this.setState({
                 rePasswordWarning:'block'
              })
        }


        if( this.state.password !== this.state.confirmation){

          this.setState({same:false});
          console.log(this.state.same)

           return;

        } else {

          this.setState({same:true});

            var userData={
              firstName:this.state.firstName,
              lastName:this.state.lastName,
              password:this.state.password,
              email:this.state.email,
              facebookId:'guest'
            }

            var dis=this;
           this.props.dispatch(SignUpUser(userData)).then(function(){

              var data={
                  username:userData.email,
                  password:userData.password
              }

                console.log(data)
                     dis.props.dispatch(LogInUser(data)).then(function(){

                       console.log('then happened');

                       hashHistory.push('/home');

                     });

           })

        }
    }

    handleChange( event ){

       console.log(event.target.id)

      this.setState({
        emailWarning:'none',
         firstNameWarning:'none',
          lastNameWarning:'none',
           passwordWarning:'none',
            rePasswordWarning:'none'
      })


            if(event.target.id==='firstNameInput'){  this.setState({firstName:event.target.value}) }
              if(event.target.id==='lastNameInput'){   this.setState({lastName:event.target.value}) }
                if(event.target.id==='emailInput'){   this.setState({email:event.target.value}); }
                  if(event.target.id==='passwordInput'){

                      this.setState({same:true});
                    this.setState({password:event.target.value});
                   }
                    if(event.target.id==='confirmationInput'){

                          this.setState({same:true});

                       this.setState({confirmation:event.target.value});

                     }

    }

    selectInput(element){

        this.setState({selectedInput:element})

    }



      render(){

        var sameOrNot='none';

        if(this.state.same === false){

            sameOrNot='block';


        } else {
           sameOrNot='none';
        }

        return(

   <div className="sign-up-container">
     	<div className="sign-up">

        <div className="signup-left">

           	<h1> Sign Up</h1>
           	<hr></hr>
           					<button  id="facebook-button" onClick={this.facebooklogin}  name="button">Sign Up with Facebook</button>

           	<h1>or</h1>

           	<p>Plese fill in the fields.</p>
        </div>


    <div className="signup-right">
     	<div className="sign-up-field-container">
            <form>
                   		<div className="first-name">
                   				<label>First Name</label>
                   				<input  onChange={ this.handleChange } id="firstNameInput" onClick={()=> this.selectInput('firstName')}  type="username" className="" required></input>
                   				</div>
                                    <div style={{ display:this.state.firstNameWarning  , marginBottom:'3px' , padding:'5px' }} className="alert alert-danger">
                                    <strong>Sorry</strong> You must fill this field before submitting.
                                    </div>


                   				<div className="last-name">
                   				<label >Last Name</label>
                   				<input  onChange={ this.handleChange } id="lastNameInput"  onClick={()=> this.selectInput('lastName')}   type="username" className=""></input>
                   				</div>
                                    <div style={{ display:this.state.lastNameWarning , marginBottom:'3px' , padding:'5px'}}   className="alert alert-danger">
                                    <strong>Sorry</strong> You must fill this field before submitting.
                                    </div>

                   					<div className="email">
                   					<label >Email</label>
                   					<input  onChange={ this.handleChange }  id="emailInput"  onClick={()=> this.selectInput('email')}    type="username" className=""></input>
                   					</div>
                                    <div style={{ display:this.state.emailWarning  , marginBottom:'3px' , padding:'5px' }} className="alert alert-danger">
                                    <strong>Sorry</strong> You must fill this field before submitting.
                                    </div>

                   					<div  className="password">
                   					<label >Password</label>
                   					<input onChange={ this.handleChange }  id="passwordInput"   onClick={()=> this.selectInput('password')}   type="password" className=""></input>
                   					</div>
                                  <div style={{ display:this.state.passwordWarning  , marginBottom:'3px' , padding:'5px' }} className="alert alert-danger">
                                  <strong>Sorry</strong> You must fill this field before submitting.
                                  </div>

                   					<div  className="password">
                   					<label >Confirm Password</label>
                   					<input onChange={ this.handleChange }  id="confirmationInput"  onClick={()=> this.selectInput('confirmation')}  type="password" className=""></input>
                   					</div>
                                  <div style={{ display:this.state.rePasswordWarning  , marginBottom:'3px' , padding:'5px' }} className="alert alert-danger">
                                  <strong>Sorry</strong> You must fill this field before submitting.
                                  </div>

                                  <div style={{ display:sameOrNot}} className="alert alert-danger">
                                  <strong>Sorry</strong> The confirmation password does not match.
                                  </div>


                   					<button  id="submit-button" type="submit"  onClick={this.handleSubmit}> Submit</button>
                        </form>
                   	 </div>
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
  user:state.user,
  signedUpedUser:state.signedUpedUser
  }
}

var SignUpContainer= connect(mapStateToProps)(SignUp);


export default SignUpContainer;
