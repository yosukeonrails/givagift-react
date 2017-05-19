
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
import DashboardContainer from './components/dashboard.js'
import LandingPageContainer from './components/landing.js'
import ResultContainer from './components/result.js'
import SignUpContainer from './components/sign-up.js'
import AvatarContainer from './components/avatar.js'
import TraitsContainer from './components/traits.js'
import LevelsContainer from './components/levels.js'
import GenderContainer from './components/gender.js'
import HomeContainer from './components/home.js'
import AgeContainer from './components/age.js'
import StarterContainer from './components/starter.js'
import RedirectContainer from './components/redirect.js'


var routes = (
    <Router history={hashHistory}>
       <Route path="/" component={AppContainer}>

           <IndexRoute component={MainApp} />
                <Route path="/home" component={HomeContainer}/>
                <Route path="/results/:id" component={ResultsAppContainer} />
                <Route path="/dashboard" component={DashboardContainer}/>
                <Route path="/home" component={LandingPageContainer}/>
                <Route path="/result/:id" component={ResultContainer}/>
                <Route path="/signup" component={SignUpContainer}/>
                <Route path="/avatar" component={AvatarContainer}/>
                <Route path="/traits" component={TraitsContainer}/>
                <Route path="/levels" component={LevelsContainer}/>
                <Route path="/gender" component={GenderContainer}/>
                <Route path="/age" component={AgeContainer}/>
                <Route path="/starter" component={StarterContainer}/>
                <Route path="/redirect" component={RedirectContainer}/>
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
