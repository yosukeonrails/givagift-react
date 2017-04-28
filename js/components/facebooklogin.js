require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';


export class FacebookLogin extends React.Component{

  constructor(props){
    super(props)


  }


  render () {

    return(
  <div>

        <form>

            <a href="/auth/facebook">
         facebook login
              </a>

        </form>
  </div>
    );
  }
}


  var mapStateToProps= function(state){
  
        return {

        }
  }

   var FacebookLoginContainer= connect(mapStateToProps)(FacebookLogin);

export default FacebookLoginContainer;
