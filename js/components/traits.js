var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import BubbleContainer from './bubble.js'


export class Traits extends React.Component{

constructor(props){
super(props);

}



render () {

  console.log('itts working and renderin again!');
  console.log(this.props);
  console.log(this.props.bubblesArray);


  var array=[];

  var arr= this.props.bubblesArray;
  var bubblesArrayData = Object.keys( arr).map(function (key) { return  arr[key] });

  console.log(bubblesArrayData);
  console.log(bubblesArrayData.length);
  for( var i=0 ; i < bubblesArrayData.length; i++ ){
    console.log('adding');
      array.push(<BubbleContainer id={i} bubbleData={bubblesArrayData[i]} />)
  }


return(

    <div className="traits">

                    <div className="avatar-maker-background">

                                  	<div className="avatar-traits">

                                                    <div className="trait-top">
                                                  		      <h1>Choose <span className="traits-number">4</span> words that most <br></br>relates to that person.</h1>

                                                                      <div className="counter">
                                                                                <div className="counter-bar">
                                                                                        <div className="counter-bar-full"></div>
                                                                                </div>
                                                                                <div className="couter-ratio"></div>
                                                                      </div>

                                                      </div>

                                                      <div className="trait-bottom">

                                                          {array}
                                                      </div>




                                  	 </div>
                    </div>


    </div>
);
}
}


var mapStateToProps= function(state){


console.log(state.bubblesArray);

return {
  bubblesArray:state.bubblesArray,
  countData:state.countData,
}
}

var TraitsContainer= connect(mapStateToProps)(Traits)

module.exports = TraitsContainer;
