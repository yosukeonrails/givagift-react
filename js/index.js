
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
import DashboardContainer from './components/dashboard.js'
import LandingPageContainer from './components/landing.js'
import SignUpContainer from './components/sign-up.js'
import TraitsContainer from './components/traits.js'
import LevelsContainer from './components/levels.js'
import GenderContainer from './components/gender.js'
import HomeContainer from './components/home.js'
import AgeContainer from './components/age.js'
import StarterContainer from './components/starter.js'
import RedirectContainer from './components/redirect.js'
import GiftResultsContainer from './components/gift-results.js'
import QueryPosterContainer from './components/query-poster.js'


var routes = (
    <Router history={hashHistory}>
       <Route path="/" component={AppContainer}>

           <IndexRoute component={MainApp} />
                <Route path="/home" component={HomeContainer}/>
                <Route path="/dashboard" component={DashboardContainer}/>
                <Route path="/home" component={LandingPageContainer}/>
                <Route path="/signup" component={SignUpContainer}/>
                <Route path="/traits/:id" component={TraitsContainer}/>
                <Route path="/levels/:id" component={LevelsContainer}/>
                <Route path="/gender/:id" component={GenderContainer}/>
                <Route path="/age/:id" component={AgeContainer}/>
                <Route path="/starter" component={StarterContainer}/>
                <Route path="/redirect" component={RedirectContainer}/>
                <Route path="/results" component={GiftResultsContainer}/>
                <Route path="/queryposter" component={QueryPosterContainer}/>

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
