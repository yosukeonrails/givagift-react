var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import BubbleContainer from './bubble.js'


export class Traits extends React.Component{

constructor(props){
super(props);

}

render () {

  var bubbleData= this.props.bubbleData;
  var bubbleArray=[];

      console.log(this.props.countData.length);

      if(this.props.countData.length === 3){
          console.log('TOO MANY');
      }

       for(var i=0; i< bubbleData.length ; i++){

    var randomWidth=[];
    var randomInterval=[];

      for(var   d=0; d<10 ; d++){
           randomWidth.push( Math.floor(Math.random() * 10) + 1 );
           randomInterval.push( Math.floor(Math.random() * 200) + 0);
      }

    bubbleArray.push(  <BubbleContainer chosen={bubbleData[i].chosen} id={i} randomWidth={randomWidth} randomInterval={randomInterval} bubbleData={bubbleData[i]}/> )
  }

return(

    <div className="traits">

    <div className="avatar-maker-background">

    	<div className="avatar-traits">

      <div className="trait-top">
    		<h1>Choose <span className="traits-number">4</span> words that most <br></br>relates to that person.</h1>

        <div className="counter">
        <div className="counter-bar">    <div className="counter-bar-full"></div></div>

    </div>

        </div>
            {bubbleArray}
    	 </div>
    </div>


    </div>
);
}
}


var mapStateToProps= function(state){

console.log(state);
return {
  bubbleData:state.bubbleData,
  countData:state.countData,
 user:state.user,

}
}

var TraitsContainer= connect(mapStateToProps)(Traits)

module.exports = TraitsContainer;
