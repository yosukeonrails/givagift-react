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

  var bubblesArray= this.props.bubblesArray;
  var array=[];

      var bubblesArrayData= this.props.bubblesArray;

return(

    <div className="traits">

    <div className="avatar-maker-background">

    	<div className="avatar-traits">

      <div className="trait-top">
    		<h1>Choose <span className="traits-number">4</span> words that most <br></br>relates to that person.</h1>

        <div className="counter">
        <div className="counter-bar"><div className="counter-bar-full"></div></div>
        <div className="couter-ratio"></div>

    </div>

        </div>
          {


            this.props.bubblesArray.map(function(bubble, i){

              return   <BubbleContainer chosen={bubble.chosen}  bubblesArrayData={bubblesArrayData} id={i} bubbleData={bubble}/>

          })
        }
    	 </div>
    </div>


    </div>
);
}
}


var mapStateToProps= function(state){


console.log(state.bubblesArray);

return {
  bubblesArray:state.bubblesArray,
  countData:state.countData,
}
}

var TraitsContainer= connect(mapStateToProps)(Traits)

module.exports = TraitsContainer;
