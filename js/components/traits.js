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
var bubbleArray=[];
var bubbleData= [{
name:'Geek',
chosen:false,
url:'url(https://source.unsplash.com/YVgOh8w1R4s/1600x900)',
},

{
name:'Introvert',
chosen:false,
url:'url(https://source.unsplash.com/zvKx6ixUhWQ/1600x900)',
},


{
name:'Outdoor',
chosen:false,
url:'url(https://source.unsplash.com/4F1ijaoCTlg/1600x900)',
},


{
name:'Fooder',
chosen:false,
url:'url(https://source.unsplash.com/TO69trRWlrI/1600x900)',
},


{
name:'Fooder',
chosen:false,
url:'url(https://source.unsplash.com/YVgOh8w1R4s/1600x900)',
},
]



export class Traits extends React.Component{

constructor(props){
super(props);

}

render () {



  console.log(bubbleData);
  for(var i=0; i<bubbleData.length ; i++){

    var randomWidth=[];
    var randomInterval=[];

      for(var   d=0; d<10 ; d++){
           randomWidth.push( Math.floor(Math.random() * 10) + 1 );
           randomInterval.push( Math.floor(Math.random() * 200) + 0);
      }

    bubbleArray.push(  <BubbleContainer chosen={bubbleData[i].chosen} id={i} randomWidth={randomWidth} randomInterval={randomInterval} bubbleData={bubbleData[i]}/> )
  }

return(

    <div className="traits">

    <div className="avatar-maker-background">

    	<div className="avatar-traits">

    		<h1>Choose up to 4 traits</h1>

            {bubbleArray}

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

}
}

var TraitsContainer= connect(mapStateToProps)(Traits)

module.exports = TraitsContainer;
