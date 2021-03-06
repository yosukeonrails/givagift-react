var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, getAllQuery, CallAmazon , layOutState, changeMode,logOut, CallAmazonCalls } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import LevelContainer from './level.js'
import queryGenerator from '../generate-query.js'
import bigFilter from '../itemfilter.js'
import correlationSorter from '../correlation-sorter.js'




export class Levels extends React.Component{

constructor(props){
super(props);
   this.goNext= this.goNext.bind(this)
}

  goNext(){

      var giftFormState= this.props.giftFormState;

      $('.loading-screen1').css("display", "block")

      var resultObject= [
        giftFormState.gender.traits ,
        giftFormState.relationship.traits,
        giftFormState.age.traits,
        giftFormState.personality.traits
       ]


       var dis= this;

        this.props.dispatch(getAllQuery()).then(function(){
                console.log('dispatched get all query')


                          var queryArray= dis.props.queryArray;
                          console.log(queryGenerator());
                          console.log(queryArray);
                          // this can be replaced by query from the database wit this.props.queryData ;

                          var toBeFiltered=[];

                          function queryFormator(queryArray , c ){

                               queryArray.map(function(q){

                                toBeFiltered.push( q.queries[c])

                               })
                              }

                              // gender
                           var importance=1
                            queryFormator(queryArray , 0);
                            bigFilter(resultObject[0] , toBeFiltered , importance);
                            console.log(toBeFiltered)

                            // relationship
                            toBeFiltered=[];
                             importance=1
                            queryFormator(queryArray , 1);
                            bigFilter(resultObject[1] , toBeFiltered , importance);

                            //age
                              toBeFiltered=[];
                               importance=1
                            queryFormator(queryArray , 2);
                            bigFilter(resultObject[2] , toBeFiltered , importance);

                            // personality
                              toBeFiltered=[];
                               importance=2
                            queryFormator(queryArray , 3);
                            bigFilter(resultObject[3] , toBeFiltered , importance);



                          var correlatedArray= correlationSorter(queryArray);
                            console.log(correlatedArray);
                    var callQueryArray=[];

                      for(var i=0 ; i< 4 ; i++){

                          callQueryArray.push(correlatedArray[i].name);
                      }

                      var callArray=[];

                      callQueryArray.map(function(query){

                              dis.props.dispatch(CallAmazon(query)).then(function(){

                                      console.log('pushing', dis.props.amazonData)
                                       callArray.push(dis.props.amazonData);

                                       dis.props.dispatch(CallAmazonCalls(callArray));

                                       if(dis.props.callArray.length=== 4){
                                         console.log('redirecting');
                                           $('.loading-screen1').css("display", "none")
                                          hashHistory.push('/results')
                                       }
                              });

                      })




        });





  }

render () {

  var renderedLevels= this.props.giftFormState.traits;
  var renderedLevelsArray=[];

  var pointSum=0;




  var newChosenBubbleArray= this.props.giftFormState.traits;
      newChosenBubbleArray.map(function( bubble, i){
           pointSum= pointSum+bubble.percentage;
    })


  var pointsLeft= 250 - pointSum;
    console.log(pointsLeft);

  renderedLevels.map(function(level , i ){

    renderedLevelsArray.push( <LevelContainer percentage={level.percentage} id={level.id} name={level.name} backgroundImage={level.url}/> )

  })


return(
<div>

  <div className="loading-screen1">

    <div className="loading-screen1-text">

          <h1>loading . . .</h1>

        <div><img src="https://www.ufairfax.edu/resources/images/forms/loading-transparent.gif"></img></div>
    </div>


  </div>

  <div className="levels-container">

        <h1> Chooose your Levels </h1>
        <h1>{pointsLeft} points left</h1>
      <button className="done-button" onClick={this.goNext}>done</button>

      {renderedLevelsArray}

</div>


</div>
);
}
}


var mapStateToProps= function(state){

console.log(state);
return {
 user:state.user,
 mode:state.mode,
 loggedUser:state.loggedUser,
 giftFormState:state.giftFormState,
 chosenBubbleArray:state.chosenBubbleArray,
 queryArray: state.queryArray,
 amazonData:state.amazonData,
 callArray:state.callArray
}
}

var LevelsContainer= connect(mapStateToProps)(Levels)

module.exports = LevelsContainer;
