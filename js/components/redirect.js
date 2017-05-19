var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'


export class Redirect extends React.Component{

constructor(props){
super(props);

}

render () {

  if(this.props.redirectQuery){
    console.log('redirecting to');
    window.location.href='/#/'+this.props.redirectQuery
  } 

return(

  <div>
          <h1> redirecting . . .</h1>
  </div>
);
}
}


var mapStateToProps= function(state){

console.log(state);
return {
  redirectQuery:state.redirectQuery
}
}

var RedirectContainer= connect(mapStateToProps)(Redirect)

module.exports = RedirectContainer;
