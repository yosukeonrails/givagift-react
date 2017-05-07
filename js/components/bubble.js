var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
var chosen=false;

var bubbleState={
  chosen:'linear-gradient(rgba(64, 41, 220, 0.43), rgba(6, 1, 1, 0.85))',
  unchosen:"linear-gradient(rgba(128,128,128,.43),rgba(6,1,1,.85))"
}

export class Bubble extends React.Component{

constructor(props){
super(props);
 this.chooseBubble= this.chooseBubble.bind(this);
}

componentDidMount(){
  this.setState({
    bubbleChosen:false
  })
}

chooseBubble(e){

var target=e.target.id;

  console.log(this.state.bubbleChosen);

          $('.'+ e.target.id ).animate({width:'180px', height:'180px', opacity:0}, function(){
                $('.'+target ).css("opacity","1")
                    $('.'+target ).css("width","120px");
                          $('.'+target ).css("height","120px");
          });


      if(this.state.bubbleChosen === true){


          $('.bubble-inside-'+e.target.id ).css("background", bubbleState.unchosen);
                this.setState({bubbleChosen:false});
      } else {

        $('.bubble-inside-'+e.target.id ).css("background", bubbleState.chosen);

        this.setState({bubbleChosen:true});


      }

}



render () {

var bubbleId= 'bubble'+this.props.id;
var bubbleOutsideClass='bubble-outside'+' bubble'+this.props.id;
var bubbleInsideClass='bubble-inside'+' bubble-inside-bubble'+this.props.id;

return(
    <div  id={bubbleId} onClick={this.chooseBubble} className="bubble-container">

        <div id={bubbleId} className={bubbleOutsideClass} >
        </div>

        <div id={bubbleId} style={{backgroundImage:this.props.bubbleData.url }} className="bubble">
                <div  id={bubbleId} className= "bubble-inside" style={{background:this.props.bubbleData.background}} className={bubbleInsideClass}>
                      <h2 id={bubbleId}  >{ this.props.bubbleData.name}</h2>
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

var BubbleContainer= connect(mapStateToProps)(Bubble)

module.exports = BubbleContainer;
