var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'


export class Gender extends React.Component{

constructor(props){
super(props);

}

render () {


return(
<div className="gender-page">
  <h1>This gift is for a... </h1>

  <div className="gender-top">

  <div className="gender gentleman" id="gentleman">
    <h2>guy</h2>
  </div>

    <div className="gender-middle">
  <h1> or </h1>
    </div>

    <div className="gender lady" id="lady">
    <h2>gal</h2>
    </div>

    </div>

    <div className="gender-bottom">
    <div className="gender robot" id="robot">
    <h2>other</h2>
    </div>

    </div>

</div>
);
}
}


var mapStateToProps= function(state){

console.log(state);
return {
 user:state.user,
 layOutState:state.layOutState,
 mode:state.mode,
 loggedUser:state.loggedUser
}
}

var GenderContainer= connect(mapStateToProps)(Gender)

module.exports = GenderContainer;
