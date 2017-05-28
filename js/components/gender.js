var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, findGiftFormById,changeMode,logOut ,saveGiftForm} from '../actions/index.js'
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

  //     var element= $('#'+e)
  //     element.stop()
  //  element.animate({height:'200px', width: '200px'}, 300 , function(){
  //  })
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

chooseGender(genderId){

    console.log(this.state.chosenGender)

  var genders=["gentleman", "lady","robot"];
  var genderIndex= genders.indexOf(genderId);
  var genderInfoArray=[{name:'male' , traits:["other","male"]}, {name:'female' , traits:["other",  "female"]}, {name:'other' , traits:["other","other"] }]
  var chosenGenderObject= genderInfoArray[genderIndex]

  var dis=this;

  if(chosenGenderObject === undefined){
      console.log('ERROR')
    return
  }

  var data=  Object.assign({}, this.props.giftFormState ,  {gender:chosenGenderObject}, {lastPage:'age'})
    this.props.dispatch( saveGiftForm(data) ).then(function(){
      hashHistory.push('/age/'+dis.props.giftFormState.id)
    });

}

componentWillMount(){

  var dis=this;

  this.props.dispatch(getFacebookUser()).then(function(){
    console.log('got user');

      console.log(dis.props.loggedUser);

  })

     this.setState({ mouseOverIs:false});

     if(this.props.loggedUser && this.props.params.id ){

    this.props.dispatch( findGiftFormById( this.props.params.id, this.props.loggedUser.facebookId  ) ).then(function(){

      var data=  Object.assign({}, dis.props.foundGiftForm )

      dis.props.dispatch(saveGiftForm(data));

    })

  }  else {

    console.log('no user ');
    hashHistory.push('/home')

  }

  //  find logged User or sele redirect to home//

   // find by params.id or else redirect to home //

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
    console.log(e.target.id);

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


  <button  value="gentleman" onClick={()=>{this.chooseGender('gentleman')} }   onMouseEnter={this.increaseSize}  onMouseLeave={this.decreaseSize}  className="gender gentleman" id="gentleman">

      <h2 value="gentleman" >guy</h2>

  </button>



    <div className="gender-middle">
  <h1> or </h1>
    </div>


    <button value="lady" onClick={()=>{this.chooseGender('lady')} }   onMouseEnter={this.increaseSize}   onMouseLeave={this.decreaseSize} className="gender lady" id="lady">
    <h2 value="lady">gal</h2>
    </button>

    </div>

    <div className="gender-bottom">

    <button value="robot" onClick={()=>{this.chooseGender('robot')} } onMouseEnter={this.increaseSize} onMouseLeave={this.decreaseSize}     className="gender robot" id="robot">
    <h2 value="robot" >other</h2>

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
 giftFormState:state.giftFormState,
 foundGiftForm:state.foundGiftForm
}
}

var GenderContainer= connect(mapStateToProps)(Gender)

module.exports = GenderContainer;
