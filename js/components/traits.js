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

var traitsAction={
hideResults : () => {$('.traits-result').animate({opacity:0} , function(){ $('.traits-result').css("display" , "none") })   ; console.log('hidding') },
showResults :() => { $('.traits-result').css("display", "block");  $('.traits-result').animate({opacity:1}) }
}


export class Traits extends React.Component{

constructor(props){
super(props);

this.hideResults= this.hideResults.bind(this);
this.goNext = this.goNext.bind(this);

}

hideResults(){

    traitsAction.hideResults();

}

goNext(){
  console.log('going next');
}


render () {

  var array=[];
  var chosenBubbleArray=[];
  var arr= this.props.bubblesArray;
  var bubblesArrayData = Object.keys( arr).map(function (key) { return  arr[key] });



  bubblesArrayData.map(function( bubble, i){
        if(bubble.count > 0 ){
          chosenBubbleArray.push(<BubbleContainer id={i} bubbleData={bubblesArrayData[i]} />)
        }
  })
  
  if(chosenBubbleArray > 4){
      traitsAction.hideResults();
  }

  if(chosenBubbleArray.length === 4 ){

    var showDelay =   setTimeout( function(){
        traitsAction.showResults();
      }, 1000);
  } else {

      console.log('stopiing');
      traitsAction.hideResults();
      clearTimeout(showDelay)
  }

  for( var i=0 ; i < bubblesArrayData.length; i++ ){
      array.push(<BubbleContainer id={i} bubbleData={bubblesArrayData[i]} />)
  }


return(

    <div className="traits">

       <div className="traits-result">
                <h1>Alright, are these good?</h1>

         <div className="chosen-bubble-container">
          {chosenBubbleArray}
          </div>

          <div className="traits-result-buttons"> <button onClick={this.hideResults} >back</button>  <button onClick={this.goNext} >yep</button> </div>

       </div>
                    <div className="avatar-maker-background">

                                  	<div className="avatar-traits">

                                                    <div className="trait-top">
                                                  		      <h1>Choose <span className="traits-number">4</span> words that most <br></br>relates to that person.</h1>

                                                                      <div className="counter">
                                                                                <div className="counter-bar">
                                                                                        <div className="counter-bar-full"></div>
                                                                                </div>
                                                                                <div className="couter-ratio"></div>
                                                                      </div>

                                                      </div>

                                                      <div className="trait-bottom">

                                                          {array}
                                                      </div>




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
