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


          $('.'+e.target.id ).animate({width:'180px', height:'180px', opacity:0}, function(){
            $('.'+target ).css("opacity","1")
            $('.'+target ).css("width","120px");
            $('.'+target ).css("height","120px");

          });

      if(this.state.bubbleChosen === true){
        // removing already chosen bubbles

          $('.bubble-inside-'+e.target.id ).css("background", bubbleState.unchosen);
          this.setState({bubbleChosen:false});
          var dis=this;


          function checkBubble(bubble) {
          return bubble=== dis.props.bubbleData.name;
          }

          var unchosenBubble= chosenBubbleArray.findIndex(checkBubble);
          chosenBubbleArray.splice(unchosenBubble, 1);
          barWidth= (chosenBubbleArray.length*150)+'px'
          $('.counter-bar-full').css("width",barWidth )

          currentBubbleCount--;

          var newBubbleArray= this.props.bubblesArray;

            newBubbleArray.map(function(bubble , i){

                if(i== dis.props.id){
                  bubble.count =0;
                }

                if(bubble.count > dis.props.bubbleData.count){


                  bubble.count--;

                  var addBubbleData= {
                      id:i,
                      count:bubble.count--
                  }


                 dis.props.dispatch(addBubble(addBubbleData));

                }

                else {



                }

            })


      }

      else

      {

        // choonse and add a bubble

        if(chosenBubbleArray.length>= 4){
          return
        }

        $('.bubble-inside-'+e.target.id ).css("background", bubbleState.chosen);
        this.setState({bubbleChosen:true});
        chosenBubbleArray.push(this.props.bubbleData.name)
        var bubble=this.props.bubbleData.name;
        barWidth= (chosenBubbleArray.length*150)+'px'
        $('.counter-bar-full').css("width",barWidth )



          currentBubbleCount++

        var chosenBubble={
          id:this.props.id,
          count:currentBubbleCount
        }


        var newBubbleArray= dis.props.bubblesArray;

        newBubbleArray[this.props.id].count = currentBubbleCount;

        var addBubbleData= {
            id:this.props.id,
            count: currentBubbleCount
        }
          this.props.dispatch(addBubble(addBubbleData));

      }


}



render () {

var bubbleId= 'bubble'+this.props.id;
var bubbleOutsideClass='bubble-outside'+' bubble'+this.props.id;
var bubbleInsideClass='bubble-inside'+' bubble-inside-bubble'+this.props.id;
countData= this.props.countData;
var dis=this
console.log('new bubble render');
console.log(this.props.id);
console.log(this.props.bubbleData.count);

return(
    <div  id={bubbleId} onClick={this.chooseBubble} className="bubble-container">

        <div id={bubbleId} className={bubbleOutsideClass} >
        </div>

        <div id={bubbleId} style={{backgroundImage:this.props.bubbleData.url }} className="bubble">
                <div  id={bubbleId} className= "bubble-inside" style={{background:this.props.bubbleData.background}} className={bubbleInsideClass}>
                      <h2 id={bubbleId}>{ this.props.bubbleData.name}</h2>
                      <h3>{this.props.bubbleData.count}</h3>
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
