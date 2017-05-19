var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut, bubbleCount , addBubble} from '../actions/index.js'
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
  this.setState({
    bubbleChosen:false,
    count:''
  })
}

chooseBubble(e){

var target=e.target.id;
var dis=this;

          // Bubble explodes animation//

          $('.'+e.target.id ).animate({width:'180px', height:'180px', opacity:0}, function(){
            $('.'+target ).css("opacity","1")
            $('.'+target ).css("width","120px");
            $('.'+target ).css("height","120px");
          });

    // removing already chosen bubbles

      if(this.state.bubbleChosen === true){

          var dis=this;
          var RemovedBubbleCount= this.props.bubbleData.count ;

          // darken bubble
          $('.bubble-inside-'+e.target.id ).css("background", bubbleState.unchosen);
          this.setState({bubbleChosen:false});

          // take out one from chosen Bubble array
          function checkBubble(bubble) {
              return bubble=== dis.props.bubbleData.name;
          }
          var unchosenBubble= chosenBubbleArray.findIndex(checkBubble);
          chosenBubbleArray.splice(unchosenBubble, 1);
          console.log(chosenBubbleArray);
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

      }

      else

      {

        // choonse and add a bubble

        if(chosenBubbleArray.length>= 4){
          return
        }

       // make bubble dark and makes it chosen
        $('.bubble-inside-'+e.target.id ).css("background", bubbleState.chosen);
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
          id:this.props.id,
          count:currentBubbleCount
        }

        var addedBubbleData={
          name:this.props.bubbleData.name,
          count:currentBubbleCount,
          url:this.props.bubbleData.url
        }


        var newBubbleArray=  Object.assign( {}, this.props.bubblesArray)

        newBubbleArray[chosenBubble.id].count = currentBubbleCount;


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

 if(renderedCount ===0){
   renderedCount="";
 }

return(
    <div  id={bubbleId} onClick={this.chooseBubble} className="bubble-container">

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
 loggedUser:state.loggedUser
}
}

var BubbleContainer= connect(mapStateToProps)(Bubble)

module.exports = BubbleContainer;
