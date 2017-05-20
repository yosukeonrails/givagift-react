var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut ,saveGiftForm, getLastGiftForm, deleteLastGiftForm } from '../actions/index.js'
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
  this.toggleChecker= this.toggleChecker.bind(this);
  this.beginNewForm= this.beginNewForm.bind(this);
  this.discartForm= this.discartForm.bind(this);
  this.continueForm= this.continueForm.bind(this);
  var dis=this;

}

componentDidMount(){
  this.setState({checkerOn:false})
}

toggleChecker(){

  if(this.state.checkerOn === false ){
    console.log('showing chcker');
    $('.checker').css("display" , "block")
    $('.checker').animate({opacity:1})

    $('.dark-shade').css("display" , "block")
      $('.dark-shade').animate({opacity:1})

    this.setState({checkerOn:true})

  } else {

  console.log('hide chcker');
    $('.checker').animate({opacity:0}, function(){
        $('.checker').css("display" , "block")
    })
    this.setState({checkerOn:false})

  }

}

discartForm(){

var dis=this;
  console.log(this.props.lastGiftFormState);

  this.props.dispatch( deleteLastGiftForm( this.props.lastGiftFormState[0].id ) ).then(function(){
            // delete and then dispatch begginNewForm
    dis.beginNewForm();

  })

}

beginNewForm(){

  var randomC= Math.floor((Math.random()*1000000)+1);
  var randomN=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  var randomId= randomC+randomN
  var dis=this;

  var date=new Date();
  var data=  Object.assign({}, this.props.giftFormState , {facebookId:this.props.loggedUser.facebookId}, {id:randomId} , {startTime:date},{lastOpened:true}, {lastPage:'gender'})
    this.props.dispatch( saveGiftForm(data) ).then(function(){

      hashHistory.push('/gender/'+dis.props.giftFormState.id)

    });
}

continueForm(){

  // copies lastGiftFormState , and assigns to data then posts as giftFormState

  //gets
   console.log(this.props.lastGiftFormState);
   var dis=this;
  var data=  Object.assign({}, this.props.lastGiftFormState)
  console.log(data[0]);
    this.props.dispatch( saveGiftForm(data[0]) ).then(function(){

      hashHistory.push('/'+dis.props.giftFormState.lastPage+'/'+dis.props.giftFormState.id)

    });

}

beginForm(){

  if(this.props.loggedUser){

  var randomC= Math.floor((Math.random()*1000000)+1);
  var randomN=Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  var randomId= randomC+randomN
  var dis=this;

    // find one that was last opened ,

  this.props.dispatch( getLastGiftForm(this.props.loggedUser.facebookId) ).then(function(){


       console.log(dis.props);
         console.log(dis.props.lastGiftFormState);
            console.log(dis.props.lastGiftFormState.length);
        //if found ,
        if(dis.props.lastGiftFormState.length === 0){

          dis.beginNewForm();
        } else {
                 dis.toggleChecker();
        }
                // startover >> if not , descart that one by deleting , then make it so it creates a new one set lastOpened:false
                // this will show a form to check if the user wants to open the last unfinshed form.
                // open last >> if yes , open the last one, in the page that it last opnene
      // if not found begin new form


  })



  // if found , ask if the person wants to open the one last opened ,


  //if not found one, create a new one


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

    <div className="dark-shade">
          <div className="checker">
              <h1> Hey , you have some unfinished business!</h1>
              <h2> Would you like to continue<br></br> where you left off? </h2>

              <button  onClick={this.discartForm} id="red-button"> discart</button>
              <button onClick={this.continueForm} > yes ! </button>
          </div>
      </div>

  <h1>Let us find you the best gift!</h1>


  <div className="happy-face">
    </div>
        <button onClick={this.beginForm} className="starter-page-button"> start </button>
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
 lastGiftFormState:state.lastGiftFormState
}
}

var StarterContainer= connect(mapStateToProps)(Starter)

module.exports = StarterContainer;
