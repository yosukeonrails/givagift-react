var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut,saveGiftForm, bubbleCount , addBubble, saveChosenBubble} from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import mainBubbleData from './bubbledata.js'
var chosen=false;
var barWidth;
var count=0;
var currentBubbleCount=0;
var countData=[];
var bubbleState={
  chosen:'linear-gradient(rgba(16, 64, 173, 0.77), rgba(6, 1, 1, 0.85))',
  unchosen:"linear-gradient(rgba(128,128,128,.43),rgba(6,1,1,.85))"
}
var chosenBubbleArray=[];

export class Bubble extends React.Component{

constructor(props){
super(props);
 this.chooseBubble= this.chooseBubble.bind(this);



}

componentWillMount(){

  // when rendering, check the database inside the gifFormArray chosen Bubble look one with same id//
  // if found, setState bubblChosen true
  // if not, setState bubbleChosen false


  // later, inside render function, get a conditional
      //if state.bubbleChosen true , darkened bubble csss, and what number.


  this.setState({
    bubbleChosen:false,
    count:''
  })
}

chooseBubble(chosenBoolean, bubbleId ){
  console.log(chosenBoolean);
  console.log(bubbleId);
var target=bubbleId;
var dis=this;

          // Bubble explodes animation//

          $('.'+bubbleId ).animate({width:'180px', height:'180px', opacity:0}, function(){
            $('.'+target ).css("opacity","1")
            $('.'+target ).css("width","120px");
            $('.'+target ).css("height","120px");
          });

    // removing already chosen bubbles

      if(chosenBoolean === true){

          var dis=this;
          var RemovedBubbleCount= this.props.bubbleData.count ;

          // take out one from chosen Bubble array
          function checkBubble(bubble) {
            console.log(bubble.id);
            console.log(dis.props.id);
              return bubble.id=== dis.props.id;
          }

          var unchosenBubble= this.props.giftFormState.traits.findIndex(checkBubble);

          console.log(unchosenBubble);

          var newChosenBubbleArray= this.props.chosenBubbleArray;
          newChosenBubbleArray.splice(unchosenBubble,1);
          chosenBubbleArray.splice(unchosenBubble, 1);

            // adjusting the bar to desired levels

          barWidth= (chosenBubbleArray.length*150)+'px'
          $('.counter-bar-full').css("width",barWidth )


            currentBubbleCount--;



            var arr= this.props.bubblesArray;
            var bubblesArrayData = Object.keys( arr).map(function (key) { return  arr[key] });


            bubblesArrayData.map(function(bubble , i){

              if( RemovedBubbleCount < bubble.count ){

                console.log(bubble.name);
                bubble.count--;
              }

                if(i == dis.props.id){
                  bubble.count = 0 ;
                }

            })

            var newBubbleArray= Object.assign( {}, bubblesArrayData )


              this.props.dispatch(addBubble(newBubbleArray));
              this.props.dispatch(saveChosenBubble(newChosenBubbleArray));

              var data=  Object.assign({}, this.props.giftFormState ,  {traits:newChosenBubbleArray})
              this.props.dispatch( saveGiftForm(data) ).then(function(){
                console.log('dispatched bubble remove');
                });

      }

      else

      {

        // CHOOSE A BUBBLE

        if(chosenBubbleArray.length>= 4){
          console.log('more than 4 mate');
          return
        }

       // make bubble dark and makes it chosen
        // $('.bubble-inside-'+bubbleId ).css("background", bubbleState.chosen);

        this.setState({bubbleChosen:true});

      // pushes it to chosenBubbleArray
        chosenBubbleArray.push(this.props.bubbleData.name)
        var bubble = this.props.bubbleData.name;
        console.log(chosenBubbleArray);
      //  makes the bar raise
        barWidth= (chosenBubbleArray.length*150)+'px'
        $('.counter-bar-full').css("width",barWidth )
      // makes the 'next' apper when bubbleChosen is 4 //



        currentBubbleCount++

        var chosenBubble={
          name:this.props.bubbleData.name,
          url:this.props.bubbleData.url,
          id:this.props.id,
          cssId:bubbleId,
          count:currentBubbleCount,
          percentage:(100-(currentBubbleCount-1)*25)
        }



        var addedBubbleData={
          name:this.props.bubbleData.name,
          count:currentBubbleCount,
          url:this.props.bubbleData.url
        }


        var newBubbleArray=  Object.assign( {}, this.props.bubblesArray)
        newBubbleArray[chosenBubble.id].count = currentBubbleCount;



        var newChosenBubbleArray= this.props.chosenBubbleArray;
        newChosenBubbleArray.push(chosenBubble);
        console.log(newChosenBubbleArray);



        this.props.dispatch(saveChosenBubble(newChosenBubbleArray));

        var data=  Object.assign({}, this.props.giftFormState ,  {traits:newChosenBubbleArray})

          this.props.dispatch( saveGiftForm(data) ).then(function(){
          console.log('dispatched');
          });


        this.props.dispatch(addBubble(newBubbleArray));


      }


}



render () {

var bubbleId= 'bubble'+this.props.id;
var bubbleOutsideClass='bubble-outside'+' bubble'+this.props.id;
var bubbleInsideClass='bubble-inside'+' bubble-inside-bubble'+this.props.id;
countData= this.props.countData;
var dis=this
var renderedCount= this.props.bubbleData.count;
var chosenBoolean=false;
$('.bubble-inside-'+bubbleId).css("background", bubbleState.unchosen); // default bubble color


// find bubble that is chosen and see if its equal to this bubble;
  this.props.giftFormState.traits.map(function(chosenBubble, i ){

        if( chosenBubble.id=== dis.props.id){

        $('.bubble-inside-'+chosenBubble.cssId).css("background", bubbleState.chosen);
        renderedCount=chosenBubble.count;
        chosenBoolean=true;
        }
  })




 if(renderedCount ===0){
   renderedCount="";
 }

return(
    <div  id={bubbleId} onClick={ ()=> this.chooseBubble(chosenBoolean, bubbleId)} className="bubble-container">

        <div id={bubbleId} className={bubbleOutsideClass} >
        </div>

        <div id={bubbleId} style={{backgroundImage:this.props.bubbleData.url }} className="bubble">
                <div  id={bubbleId} className= "bubble-inside" style={{background:this.props.bubbleData.background}} className={bubbleInsideClass}>
                      <h2 id={bubbleId}>{ this.props.bubbleData.name}</h2>
                      <h3>{renderedCount}</h3>
                </div>
        </div>
   </div>
);
}
}


var mapStateToProps= function(state){

return {
 countData:state.countData,
 user:state.user,
 layOutState:state.layOutState,
 mode:state.mode,
 bubblesArray:state.bubblesArray,
 loggedUser:state.loggedUser,
 chosenBubbleArray:state.chosenBubbleArray,
 giftFormState:state.giftFormState
}
}

var BubbleContainer= connect(mapStateToProps)(Bubble)

module.exports = BubbleContainer;
