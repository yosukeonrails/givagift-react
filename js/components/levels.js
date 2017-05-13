var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import LevelContainer from './level.js'

export class Levels extends React.Component{

constructor(props){
super(props);

}

render () {


return(
  <div className="levels-container">

    <h1> Chooose your Levels</h1>

      <LevelContainer percentage={60}/>


    <div className="level-container">

          <div className="level-container-dark">
          </div>

          <div className="level-container-dark-words">
              <h1>outdoor</h1>
          </div>

          <div className="level-container-light">
                <div className="level-container-light-words">
                    <h1>outdoor</h1>
                </div>
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
 mode:state.mode,
 loggedUser:state.loggedUser
}
}

var LevelsContainer= connect(mapStateToProps)(Levels)

module.exports = LevelsContainer;
