var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, findGiftFormById,changeMode,logOut ,saveGiftForm} from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import GenderCardContainer from './gender-card.js'
var elementArray=['lady-card', 'gentleman-card' , 'other-card']
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
  this.hoverCard = this.hoverCard.bind(this);
  this.outOfCard= this.outOfCard.bind(this);
  this.selectCard= this.selectCard.bind(this);
  this.closeAllCards= this.closeAllCards.bind(this);
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

closeAllCards(){

    $('#lady-card').stop();
    $('#gentleman-card').stop();
    $('#other-card').stop();
    $('.white-card-layer').stop();
    $('.gender-card').stop();

    var dis= this;

    elementArray.map(function(currentCard){

         var element=$('#'+currentCard);
         var blurredElement= $('#'+currentCard+"-blurred")
         var whiteCard= $('white-'+currentCard);

          whiteCard.stop();
          element.stop();
          blurredElement.stop();

          if(currentCard === dis.state.chosenGenderId){

                blurredElement.css("display" , "none");

                element.css("display", "block");
                element.animate({opacity:'1'});

                $('.white-card-layer').css("display" , "block");
                $('.white-card-layer').animate({opacity:"1"});


          } else {

                    element.css("display", "none");
                    element.css("opacity" , "0");

                    $('.white-card-layer').css("display" , "none");
                    $('.white-card-layer').css("opacity" , "0");

                    element.css("display", "block");
                    element.animate({opacity:'1'});

                    $('.white-card-layer').css("display" , "block");
                    $('.white-card-layer').animate({opacity:"1"});

          }


          // whiteCard.css("display" , "block");


    })

}


selectCard(card, gender){

      this.setState({chosenGender:gender , chosenGenderId:card });
        var elementCard=card;

        $('.blurred-card-content h1').css("padding-top", "60px");

        $('.blurred-card-content h1').animate({ paddingTop:'0'}, 200);



   elementArray.map(function(currentCard){

     if(currentCard === elementCard){



                    var element=$('#'+currentCard);

                    element.css("display", "none")
                    $('.white-card-layer').stop();
                    $('.white-card-layer').css("display", "block");
                    $('.white-card-layer').css("opacity", "1");

                    var blurredElement= $('#'+card+"-blurred")
                    blurredElement.css("display","block");

                    $('.blurred-card-content button').css("fontSize", "10px");
                        $('.blurred-card-content button').css("width", "40px");
                          $('.blurred-card-content button').css("height", "40px");

                    $('.blurred-card-content button').animate({fontSize:"17px" , width:"60px" , height:"60px"} , 200);
                    $('.blurred-card-content button').animate({fontSize:"15px" , width:"55px" , height:"55px"}, 100);

     }  else {

             var element=$('#'+currentCard);

              $('.white-card-layer').stop();
              $('.white-card-layer').animate({opacity:0}, function(){
              element.css("display", "none")
              })


              element.animate({opacity:"0"}, 200 , function(){
              element.css("display", "none")
              })


     }

   })


}

outOfCard(card){


  $('#'+card).stop();

  var element=$('#'+card)
  element.animate({opacity:'0.7'});

}

hoverCard(card){
  $('#'+card).stop();

     var element=$('#'+card)
     element.animate({opacity:'1'});

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


            <div className="gender-row-container">
                    <h1>This gift is for a... </h1>

                    <div className="gender-row">


                      <div className="gender-card-holder">

                                      <div className="white-card-layer white-lady-card">
                                         <button  onClick={()=> this.selectCard('lady-card' , 'lady')} onMouseOut={()=> this.outOfCard('lady-card') } onMouseOver={ ()=> this.hoverCard('lady-card') } className="gender-card" id="lady-card">

                                           <h1>Lady</h1>
                                           <h2>Gal</h2>
                                           <h3>Girl</h3>

                                         </button>
                                      </div>

                           <button  className="gender-card" id="lady-card-blurred">

                                      <div className="blurred-card-content">
                                        <i  onClick={this.closeAllCards} className="fa fa-times-circle-o" aria-hidden="true"></i>


                                            <h1 className="lady-font">Lady</h1>


                                              <div className="circle-container">
                                                    <button  onClick={()=>this.chooseGender('lady')} >next</button>
                                              </div>

                                      </div>

                                      <div className="lady-card-blurred-inside">


                                      </div>
                           </button>


                      </div>


                       <div className="gender-card-holder">

                                 <div className="white-card-layer white-other-card">
                                         <button  onClick={()=> this.selectCard('other-card', 'robot')}  onMouseOut={()=> this.outOfCard('other-card') } onMouseOver={ ()=> this.hoverCard('other-card') }  className="gender-card" id="other-card">
                                                 <h1 className="other-font" >Other</h1>
                                         </button>
                                </div>


                                <button  className="gender-card" id="other-card-blurred">

                                  <div className="blurred-card-content">
                                    <i  onClick={this.closeAllCards} className="fa fa-times-circle-o" aria-hidden="true"></i>
                                    <h1>Other</h1>
                                    <button  onClick={()=>this.chooseGender('robot')} >next</button>
                                  </div>

                                   <div className="other-card-blurred-inside">

                                   </div>

                                </button>

                       </div>



                                     <div className="gender-card-holder">

                                                <div className="white-card-layer white-gentleman-card">
                                                           <button onClick={()=> this.selectCard('gentleman-card' , 'gentleman')}    onMouseOut={()=> this.outOfCard('gentleman-card') } onMouseOver={ ()=> this.hoverCard('gentleman-card') }  className="gender-card" id="gentleman-card">

                                                                 <h1>Man</h1>
                                                                 <h2>Guy</h2>
                                                                 <h3>Boy</h3>

                                                           </button>
                                                 </div>

                                                     <button  className="gender-card" id="gentleman-card-blurred">

                                                       <div className="blurred-card-content">
                                                         <i  onClick={this.closeAllCards} className="fa fa-times-circle-o" aria-hidden="true"></i>
                                                          <h1 className="gentleman-font" >Man</h1>
                                                          <button  onClick={()=>this.chooseGender('gentleman')} >next</button>
                                                       </div>

                                                        <div className="gentleman-card-blurred-inside">
                                                        </div>

                                                     </button>

                                   </div>

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
 loggedUser:state.loggedUser,
 giftFormState:state.giftFormState,
 foundGiftForm:state.foundGiftForm
}
}

var GenderContainer= connect(mapStateToProps)(Gender)

module.exports = GenderContainer;







  // <div className="gender-top">
  //
  // //
  // // <button  value="gentleman" onClick={()=>{this.chooseGender('gentleman')} }   onMouseEnter={this.increaseSize}  onMouseLeave={this.decreaseSize}  className="gender gentleman" id="gentleman">
  // //
  // //     <h2 value="gentleman" >guy</h2>
  // //
  // // </button>
  //
  //
  //
  //   <div className="gender-middle">
  // <h1> or </h1>
  //   </div>
  //
  //
  //   <button value="lady" onClick={()=>{this.chooseGender('lady')} }   onMouseEnter={this.increaseSize}   onMouseLeave={this.decreaseSize} className="gender lady" id="lady">
  //   <h2 value="lady">gal</h2>
  //   </button>
  //
  //   </div>
  //
  //   <div className="gender-bottom">
  //
  //   <button value="robot" onClick={()=>{this.chooseGender('robot')} } onMouseEnter={this.increaseSize} onMouseLeave={this.decreaseSize}     className="gender robot" id="robot">
  //   <h2 value="robot" >other</h2>
  //
  //   </button>
  //
  //
  //   </div>



     ///gender card
