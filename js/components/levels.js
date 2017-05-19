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
<div>



  <div className="levels-container">

        <h1> Chooose your Levels </h1>

      <button className="done-button">done</button>

      <LevelContainer percentage={30} name={'musician'} backgroundImage={'url(https://source.unsplash.com/2UuhMZEChdc/1600x900)'}/>
      <LevelContainer percentage={80} name={'geek'} backgroundImage={'url(https://source.unsplash.com/eIhH7RTlTZA/1600x900)'}/>

           <LevelContainer percentage={50} name={'fooder'} backgroundImage={'url(https://source.unsplash.com/TO69trRWlrI/1600x900)'}/>

                 <LevelContainer percentage={20} name={'outdoor'} backgroundImage={'url(https://source.unsplash.com/4F1ijaoCTlg/1600x900)'}/>


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
