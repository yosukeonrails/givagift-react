var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut , addBubble, saveGiftForm, findGiftFormById} from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import BubbleContainer from './bubble.js'
import defaultBubbleData from './defaultbubbles.js'

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

componentWillMount(){

  console.log('component will mount default bubble ');
  console.log(defaultBubbleData);
  this.props.dispatch(addBubble(defaultBubbleData))


  var dis=this;

  this.props.dispatch(getFacebookUser()).then(function(){

          })


     if(this.props.loggedUser && this.props.params.id ){


    this.props.dispatch( findGiftFormById( this.props.params.id, this.props.loggedUser.facebookId  ) ).then(function(){

      var data=  Object.assign({}, dis.props.foundGiftForm )

      dis.props.dispatch(saveGiftForm(data));

    })

  }  else {

    console.log('no user ');
    hashHistory.push('/home')

  }


}

hideResults(){

    traitsAction.hideResults();

}

goNext(){

  var dis=this;
  console.log(this.props.chosenBubbleArray);

  var data=  Object.assign({}, this.props.giftFormState , {traits:this.props.chosenBubbleArray})
    this.props.dispatch( saveGiftForm(data) ).then(function(){

      hashHistory.push('/levels/'+dis.props.giftFormState.id)

    });

}


render () {

  console.log('re-rendering');

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
  newBubbleArray:state.newBubbleArray,
  giftFormState:state.giftFormState,
  foundGiftForm:state.foundGiftForm,
  loggedUser:state.loggedUser,
  chosenBubbleArray:state.chosenBubbleArray
}
}

var TraitsContainer= connect(mapStateToProps)(Traits)

module.exports = TraitsContainer;
