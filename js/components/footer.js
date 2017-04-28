
var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
export class Footer extends React.Component{

  constructor(props){
      super(props);


  }

render(){

  return(
    <div className="footer-div">



     <div className="footer-col">
     <h2>Help</h2>
     <ul>

      <li>FAQ</li>
      <li><a href="https://github.com/yosukeonrails/react-givagift">Github</a></li>
      <li><a href="https://www.linkedin.com/in/yosukeyoh/">LinkedIn</a></li>

     </ul>
     </div>

     <div className="footer-col">
     <h2>Menu</h2>
     <ul>
     <li>Sign in</li>
     <li>What We Do</li>
     <li>Affiliates</li>
     <li>GivaQuiz</li>
     <li>Featured Gifts</li>
     </ul>
     </div>

     <div className="footer-col">
     <h2>Contact</h2>
     <ul>

      <li><a href="https://github.com/yosukeonrails/react-givagift">Github</a></li>
      <li >NorthgateWay, Seattle WA</li>
      <li>givagifts-support@gmail.com</li>
     <li>1800-giva-gifts</li>
     <li></li>
     </ul>
     </div>

  <h1>Givagift <i className="fa fa-copyright" aria-hidden="true"></i> <h3>All Rights Reserved</h3></h1>

    </div>
  );
}
}




var mapStateToProps= function(state){

      return {
        currentQuestion:state.currentQuestion,
        selectedAnswerInfo:state.selectedAnswerInfo,
        answerSelected:state.answerSelected

      }
}


var FooterContainer= connect(mapStateToProps)(Footer)

export default FooterContainer;
