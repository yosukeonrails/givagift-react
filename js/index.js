require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;



import { Provider } from 'react-redux';

import store from './store';
import MainApp from './components/mainapp.js';
import AppContainer from './components/app.js'
import ResultsAppContainer from './components/resultsapp.js'
import QuizApp from './components/quizapp.js'
import SignupLogin from './components/signup-login.js'
import SignUp from './components/sign-up.js'
import DashboardContainer from './components/dashboard.js'
import QuizInfoContainer from './components/quizinfo.js'
import FacebookLoginContainer from './components/facebooklogin.js'
import LandingPageContainer from './components/landing.js'
import UserSignUpContainer from './components/user-signup.js'
import LoginContainer from './components/login.js'
import BubbleAnswerContainer from './components/bubble-answer.js'
import ResultContainer from './components/result.js'


var routes = (
    <Router history={hashHistory}>
       <Route path="/" component={AppContainer}>

           <IndexRoute component={MainApp} />
                <Route path="/results/:id" component={ResultsAppContainer} />
                <Route path="/quizinfo" component={QuizInfoContainer} />
                <Route path="/quiz" component={QuizApp} />
                <Route path="/signup-login" component={SignupLogin}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/dashboard" component={DashboardContainer}/>
                <Route path="/facebooklogin" component={FacebookLoginContainer}/>
                <Route path="/home" component={LandingPageContainer}/>
                <Route path="/login" component={LoginContainer}/>
                <Route path="/signupuser" component={UserSignUpContainer}/>
                <Route path="/bubble" component={BubbleAnswerContainer}/>
                  <Route path="/result/:id" component={ResultContainer}/>
           </Route>
   </Router>
);


document.addEventListener('DOMContentLoaded', function(){

 ReactDOM.render(

<Provider store={store}>
 {routes}
</Provider>,

   document.getElementById('app'));

});
