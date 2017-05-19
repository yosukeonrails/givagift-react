var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut ,saveGiftForm} from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'

// function pulse(e){
//  var element= $('#'+e)
//         element.animate({height:'200px', width: '200px'});
//         element.animate({height:'220px', width: '220px'});
//   }


 function increaseWidthHeight(e){

      var element= $('#'+e)
      element.stop()
   element.animate({height:'200px', width: '200px'}, 300 , function(){


   })
 }


  function decreaseWidthHeight(e){
    var element= $('#'+e)
    element.stop()
    element.animate({height:'150px', width: '150px'}, 300)
  }


export class Starter extends React.Component{

constructor(props){
super(props);

  this.increaseSize= this.increaseSize.bind(this);
  this.decreaseSize= this.decreaseSize.bind(this);
  this.beginForm= this.beginForm.bind(this);

  var dis=this;

}

beginForm(){

  if(this.props.loggedUser){

  var date=new Date();
  var data=  Object.assign({}, this.props.giftFormState , {facebookId:this.props.loggedUser.facebookId}, {id:'232445ffff'} , {startTime:date}, {relationship:'not friends'})
    this.props.dispatch( saveGiftForm(data) ).then(function(){
      hashHistory.push('/gender')
    });
  }

}


componentWillMount(){
     this.setState({ mouseOverIs:false})
}

decreaseSize(e){

  this.setState({
    mouseOverIs:false
  })

  if(e.target.id){

      decreaseWidthHeight(e.target.id)
  }


}

increaseSize(e){

  this.setState({
    mouseOverIs:true,
    pulseElement:e.target.id
  })

if(e.target.id){
    console.log(e.target.id);
    increaseWidthHeight(e.target.id)
}
}


render () {

var giftFormState=this.props.giftFormState


return(

<div className="gender-page">
  <h1>Let us find you the best gift!</h1>

  <div className="happy-face">
    </div>
        <button onClick={this.beginForm}> start </button>
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
 giftFormState:state.giftFormState
}
}

var StarterContainer= connect(mapStateToProps)(Starter)

module.exports = StarterContainer;
