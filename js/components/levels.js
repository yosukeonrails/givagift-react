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

  var renderedLevels= this.props.giftFormState.traits;
  var renderedLevelsArray=[];

  var pointSum=0;





  var newChosenBubbleArray= this.props.giftFormState.traits;
      newChosenBubbleArray.map(function( bubble, i){
           pointSum= pointSum+bubble.percentage;
    })


  var pointsLeft= 250 - pointSum;
    console.log(pointsLeft);

  renderedLevels.map(function(level , i ){

    renderedLevelsArray.push( <LevelContainer percentage={level.percentage} id={level.id} name={level.name} backgroundImage={level.url}/> )

  })


return(
<div>



  <div className="levels-container">

        <h1> Chooose your Levels </h1>
        <h1>{pointsLeft} points left</h1>
      <button className="done-button">done</button>

      {renderedLevelsArray}

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
 loggedUser:state.loggedUser,
 giftFormState:state.giftFormState,
 chosenBubbleArray:state.chosenBubbleArray
}
}

var LevelsContainer= connect(mapStateToProps)(Levels)

module.exports = LevelsContainer;
