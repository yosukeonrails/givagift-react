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


export class Gender extends React.Component{

constructor(props){
super(props);

  this.increaseSize= this.increaseSize.bind(this);
  this.decreaseSize= this.decreaseSize.bind(this);
  this.chooseGender= this.chooseGender.bind(this);

  var dis=this;

    // setInterval(() => {
    //   console.log(dis.state.mouseOverIs);
    //
    //   if (dis.state.mouseOverIs) {
    //       pulse(dis.state.pulseElement)
    //   }
    //
    // }, 100);

}

chooseGender(){

  console.log(this.state.chosenGender);

  var data=  Object.assign({}, this.props.giftFormState ,  {gender:this.state.chosenGender})
    this.props.dispatch( saveGiftForm(data) ).then(function(){
      hashHistory.push('/age')
    });
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

    increaseWidthHeight(e.target.id);
    var target=e.target.id;
    this.setState({chosenGender:target})
}
}


render () {




return(

<div className="gender-page">
  <h1>This gift is for a... </h1>

  <div className="gender-top">


  <button  value="male" onClick={this.chooseGender} onMouseEnter={this.increaseSize}  onMouseLeave={this.decreaseSize}  className="gender gentleman" id="gentleman">

      <h2 value="male" >guy</h2>

  </button>



    <div className="gender-middle">
  <h1> or </h1>
    </div>


    <button value="female" onClick={this.chooseGender}  onMouseEnter={this.increaseSize}   onMouseLeave={this.decreaseSize} className="gender lady" id="lady">
    <h2 value="female">gal</h2>
    </button>

    </div>

    <div className="gender-bottom">

    <button value="other" onClick={this.chooseGender} onMouseEnter={this.increaseSize} onMouseLeave={this.decreaseSize}     className="gender robot" id="robot">
    <h2 value="other" >other</h2>

    </button>

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
 loggedUser:state.loggedUser,
 giftFormState:state.giftFormState
}
}

var GenderContainer= connect(mapStateToProps)(Gender)

module.exports = GenderContainer;
