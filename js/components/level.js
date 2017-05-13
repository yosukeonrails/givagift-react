var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'




export class Level extends React.Component{

constructor(props){
super(props);
    this.morePercentage=this.morePercentage.bind(this);
    this.lessPercentage=this.lessPercentage.bind(this);
}

morePercentage(){

}

lessPercentage(){

}

render () {


var percentage= this.props.percentage;

var width= percentage * 4;

var levelContainerLightWordsWidth = function(width){

  var levelWidth = width-122;

  if ( levelWidth < 0 ){
    levelWidth= 0;
  }

  return levelWidth;

}


var levelWidthData={

    levelContainerLight: width,
    levelContainerLightWordsWidth: levelContainerLightWordsWidth(width)

}

console.log( levelWidthData.levelContainerLightWordsWidth );


return(
  <div>
          <div className="level-container">

                <div  className="level-container-dark">
                </div>

                <div className="level-container-dark-words">
                    <h1>outdoor</h1>
                </div>

                <div style={{width:levelWidthData.levelContainerLight}} className="level-container-light">
                      <div style={{width:levelWidthData.levelContainerLightWordsWidth}}  className="level-container-light-words">
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
 layOutState:state.layOutState,
 mode:state.mode,
 loggedUser:state.loggedUser
}
}

var LevelContainer= connect(mapStateToProps)(Level)

module.exports = LevelContainer;
