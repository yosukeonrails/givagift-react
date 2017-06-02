var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'


export class GenderCard extends React.Component{

constructor(props){
super(props);
   this.hoverCard = this.hoverCard.bind(this);
   this.hoverOutCard= this.hoverOutCard.bind(this);
}

componentWillMount(){

    this.setState({
        cardOpacity:'0.7'
    })
}

hoverCard(){
     this.setState({
        cardOpacity:'1'
     })
}

hoverOutCard(){
  this.setState({
     cardOpacity:'0.7'
  })
}

render () {

  var cardId= 'card'+this.props.cardId;
  var cardOpacity= this.state.cardOpacity;


return(



       <div className="gender-card-holder">

                        <div className="white-card-layer white-lady-card">
                           <button  style={{opacity:cardOpacity}}   onMouseOut={this.hoverOutCard} onMouseOver={ this.hoverCard } className="gender-card" id={cardId}>

                             <h1>Lady</h1>
                             <h2>Gal</h2>
                             <h3>Girl</h3>

                           </button>
                        </div>

             <button  className="gender-card" id="lady-card-blurred">

                        <div className="blurred-card-content">
                          <i   className="fa fa-times-circle-o" aria-hidden="true"></i>
                            <button   >next</button>
                        </div>

                        <div className="lady-card-blurred-inside">


                        </div>
             </button>


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
  loggedUser:state.loggedUser,
  giftFormState:state.giftFormState,
  foundGiftForm:state.foundGiftForm
}
}

var GenderCardContainer= connect(mapStateToProps)(GenderCard)

module.exports = GenderCardContainer;
