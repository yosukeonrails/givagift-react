var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
var mouseDown=false;
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'



var levelContainerLightWordsWidth = function(width){

  var maxWidth=$('.level-container-light-words h1').width();
  var levelWidth = width-120;
  if ( levelWidth < 0 ){
    levelWidth= 0;
  }
  if ( levelWidth > 400 ){
    levelWidth= 400;
  }

  return levelWidth;

}


export class Level extends React.Component{

constructor(props){
super(props);
    this.mouseDown=this.mouseDown.bind(this);
    this.mouseUp= this.mouseUp.bind(this);
    this.morePercentage=this.morePercentage.bind(this);
    this.lessPercentage=this.lessPercentage.bind(this);
}

componentWillMount(){
  this.setState({
    percentage: this.props.percentage,
    mouseDown: false
  })
}


morePercentage(){

      this.setState({
        percentage: this.state.percentage + 1
      })

}

mouseDown(){
  this.setState({
    mouseDown:true
  })
}
mouseUp(){

  this.setState({
    mouseDown:false
  })

}

lessPercentage(){

  this.setState({
    percentage: this.state.percentage - 1
  })

}

render () {


var percentage= this.state.percentage;
var width= percentage * 4;
var levelWidthData={
    levelContainerLight: width,
    levelContainerLightWordsWidth: levelContainerLightWordsWidth(width)
}



return(

  <div className="single-level-container">

    <div className="minus-button">
      <button onClick={this.lessPercentage}> - </button>
    </div>

                          <div className="middle-level-container">
                                <div className="level-container">

                                      <div style={{backgroundImage:this.props.backgroundImage}} className="level-container-dark">
                                              <div className="level-container-dark-shader">
                                              </div>
                                      </div>

                                      <div className="level-container-dark-words">
                                          <h1> {this.props.name} {percentage}% </h1>
                                      </div>

                                      <div style={{width:levelWidthData.levelContainerLight , backgroundImage:this.props.backgroundImage}} className="level-container-light">
                                            <div style={{width:levelWidthData.levelContainerLightWordsWidth}}  className="level-container-light-words">
                                                <h1> {this.props.name} {percentage}%   </h1>
                                            </div>
                                            <div className="level-container-light-shader">
                                            </div>
                                      </div>
                                </div>
                        </div>

          <div className="plus-button">
            <button onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}> + </button>
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
