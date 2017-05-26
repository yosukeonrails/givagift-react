var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
var mouseDown=false;
import Tappable from 'react-tappable';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut , saveChosenBubble, saveGiftForm} from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
var intervalFunction;

function logNumber(){
  console.log('number');
}



var levelContainerLightWordsWidth = function(width){

  var maxWidth=$('.level-container-light-words h1').width();
  var levelWidth = width-120;
  if ( levelWidth < 0 ){
    levelWidth= 0;
  }
  if ( levelWidth > 400 ){
    levelWidth= 400;
  }

  return levelWidth;

}


export class Level extends React.Component{

constructor(props){
super(props);
    this.mouseDown=this.mouseDown.bind(this);
    this.mouseUp= this.mouseUp.bind(this);
    this.modifyPercentage=this.modifyPercentage.bind(this);
    var dis = this;



    setInterval(() => {
      if (this.state.mouseDown) {



        if (this.state.isPlus) {

          if(this.state.percentage >= 100){
              return;
          }

          dis.modifyPercentage(10)

        } else {

          dis.modifyPercentage(-10)

        }
      }
    }, 100);


}

componentWillMount(){

  this.setState({
    percentage: this.props.percentage,
    mouseDown: false
  })

}


modifyPercentage(inc){

  var newChosenBubbleArray= this.props.giftFormState.traits
  var dis=this;

  var pointSum=0;

  var newChosenBubbleArray= this.props.giftFormState.traits;

      newChosenBubbleArray.map(function( bubble, i){
           pointSum= pointSum+bubble.percentage;
      })


  if(inc > 0){

    if(this.state.percentage >= 100 || pointSum >= 250 ){

        return;
    }

  } else {

    if(this.state.percentage <= 0 ){

        return;
    }

  }

  var percentageArray=[];

  newChosenBubbleArray.map(function(bubble , i ){

          if(bubble.id === dis.props.id){
                bubble.percentage = dis.state.percentage+inc
          }

          percentageArray.push(bubble.percentage);

  })

          percentageArray.sort(function(a, b){return a-b});
          percentageArray.reverse();
          
var sortedPercentageArray=[];

  var sortedQuery=[];

        function sortPercentageArray(queryArray ,  sortedArray , v, sortedPercentageArray){

             if(v=== sortedArray.length){
                  return sortedPercentageArray;
             }

             var notEqualArray=[];


                  function findEqualNumber (sortedArray , queryArray, v){

                        for(var i=0 ; i < queryArray.length ; i ++ ){

                            if(queryArray[i].percentage === sortedArray[v]){

                                 var foundEqualNumber= queryArray[i];

                                            for(var j=0 ; j < queryArray.length ; j ++){
                                                  // push everything else except i //
                                                  if(i !== j){
                                                     notEqualArray.push(queryArray[j])

                                                  }

                                            }

                                return foundEqualNumber;
                            }
                      }

                }

                var equalNumber= findEqualNumber(sortedArray , queryArray , v);

                sortedPercentageArray.push(equalNumber);
                  sortedQuery.push(equalNumber.name);

                  sortPercentageArray( notEqualArray,  sortedArray , v+1, sortedPercentageArray);

        }


        sortPercentageArray(newChosenBubbleArray ,  percentageArray, 0, sortedPercentageArray);


          var newChosenBubbleArrayRef= newChosenBubbleArray;


      this.props.dispatch(saveChosenBubble(newChosenBubbleArray));


      var data=  Object.assign({}, this.props.giftFormState ,  {traits:newChosenBubbleArray} , {personality:sortedQuery})
      this.props.dispatch( saveGiftForm(data) ).then(function(){
        console.log('dispatched bubble remove');
        });


        this.setState({
          percentage: this.state.percentage + inc
        })

}

mouseDown(isPlus){

  if(!this.state.mouseDown){

    //console.log('starting function');

    /*  var intervalFunction = setInterval(function(){
          logNumber();

        }, 100);*/

  } else {

    /*console.log('stopping function');
    // clear interval and you should be good
      clearInterval(intervalFunction);*/

  }

    this.setState({
      mouseDown:true,
      isPlus,
    })


}

mouseUp(isPlus){
  //clearInterval(this.mouseDown());


   this.setState({
     mouseDown:false,
     isPlus,
   })


}

lessPercentage(){

  console.log('perentage less');
  this.setState({
    percentage: this.state.percentage - 1
  })

}

render () {

var pointSum=0;

var newChosenBubbleArray= this.props.giftFormState.traits;

    newChosenBubbleArray.map(function( bubble, i){
         pointSum= pointSum+bubble.percentage;
    })


var percentage= this.props.percentage;
var width= percentage * 4;
var levelWidthData={
    levelContainerLight: width,
    levelContainerLightWordsWidth: levelContainerLightWordsWidth(width)
}



return(

  <div className="single-level-container">

    <div className="minus-button">
      <button  onClick={()=> this.modifyPercentage(-10)} onMouseDown={() => this.mouseDown(false)} onMouseUp={() => this.mouseUp(false)}  > - </button>

    </div>

                          <div className="middle-level-container">
                                <div className="level-container">

                                      <div style={{backgroundImage:this.props.backgroundImage}} className="level-container-dark">
                                              <div className="level-container-dark-shader">
                                              </div>
                                      </div>



                                      <div className="level-container-dark-words">
                                          <h1> {this.props.name} {percentage} <span className="level-pts" >pts</span> </h1>
                                      </div>

                                      <div style={{width:levelWidthData.levelContainerLight , backgroundImage:this.props.backgroundImage}} className="level-container-light">
                                            <div style={{width:levelWidthData.levelContainerLightWordsWidth}}  className="level-container-light-words">
                                                <h1> {this.props.name} {percentage} <span className="level-pts">pts</span>  </h1>
                                            </div>
                                            <div className="level-container-light-shader">
                                            </div>
                                      </div>
                                </div>
                        </div>

          <div className="plus-button">

             <button onClick={()=> this.modifyPercentage(+10)} onMouseDown={() => this.mouseDown(true)} onMouseUp={() => this.mouseUp(true)}  > + </button>

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
 chosenBubbleArray:state.chosenBubbleArray,
 giftFormState:state.giftFormState
}
}

var LevelContainer= connect(mapStateToProps)(Level)

module.exports = LevelContainer;
