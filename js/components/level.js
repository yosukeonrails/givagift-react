var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
var mouseDown=false;
import Tappable from 'react-tappable';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
var intervalFunction;

function logNumber(){
  console.log('number');
}



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
    this.modifyPercentage=this.modifyPercentage.bind(this);
    var dis = this;
    setInterval(() => {
      if (this.state.mouseDown) {
        if (this.state.isPlus) {
          dis.modifyPercentage(1)
        } else {
          dis.modifyPercentage(-1)
        }
      }
    }, 20);


}

componentWillMount(){
  this.setState({
    percentage: this.props.percentage,
    mouseDown: false
  })
}


modifyPercentage(inc){
      this.setState({
        percentage: this.state.percentage + inc
      })
}

mouseDown(isPlus){
  console.log('mouse down');
  console.log(isPlus);
  if(!this.state.mouseDown){

    //console.log('starting function');

    /*  var intervalFunction = setInterval(function(){
          logNumber();

        }, 100);*/

  } else {

    /*console.log('stopping function');
    // clear interval and you should be good
      clearInterval(intervalFunction);*/

  }

    this.setState({
      mouseDown:true,
      isPlus,
    })


}
mouseUp(isPlus){
  //clearInterval(this.mouseDown());


   this.setState({
     mouseDown:false,
     isPlus,
   })


}

lessPercentage(){

  console.log('perentage less');
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
      <button  onMouseDown={() => this.mouseDown(false)} onMouseUp={() => this.mouseUp(false)}  > - </button>

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

             <button  onMouseDown={() => this.mouseDown(true)} onMouseUp={() => this.mouseUp(true)}  > + </button>

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
