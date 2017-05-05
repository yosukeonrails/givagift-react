

var React = require('react');
var ReactDOM = require('react-dom');

import LandingPageContainer from './landing.js'
import FooterContainer from './footer.js'
var MainApp= function(){


  return(
       <div>
      <LandingPageContainer/>

        <div className="footer-container">
        <FooterContainer/>

        </div>
        
      </div>
  );
};


export default MainApp;
