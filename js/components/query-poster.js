var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'
import QueryBubbleContainer from './query-bubble.js'

export class QueryPoster extends React.Component{

constructor(props){
super(props);

}

render () {




  var bubblesArrayData = this.props.bubblesArray;

  console.log(bubblesArrayData);

 var array=[];

  for( var i=0 ; i < bubblesArrayData.length; i++ ){
      array.push(<QueryBubbleContainer id={i} bubbleData={bubblesArrayData[i]} />)
  }

return(

  
      <div>

            <h1> Post Queries </h1>

            <label>Name:</label> <input></input>

              <label>Trait 1</label>
              <select>
              <option value="geek">geek</option>
              <option value="introvert">introvert</option>
              <option value="outdoor">outdoor</option>
              <option value="fooder">fooder</option>
              <option value="musician">musician</option>
              <option value="fashion">fashion</option>
              <option value="sporty">sporty</option>
              <option value="cute">cute</option>
                <option value="decoration">decoration</option>
              </select>

              <label>Trait 2</label>
              <select>
              <option value="geek">geek</option>
              <option value="introvert">introvert</option>
              <option value="outdoor">outdoor</option>
              <option value="fooder">fooder</option>
              <option value="musician">musician</option>
              <option value="fashion">fashion</option>
              <option value="sporty">sporty</option>
              <option value="cute">cute</option>
                <option value="decoration">decoration</option>
              </select>


              <label>Trait 3</label>
              <select>
              <option value="geek">geek</option>
              <option value="introvert">introvert</option>
              <option value="outdoor">outdoor</option>
              <option value="fooder">fooder</option>
              <option value="musician">musician</option>
              <option value="fashion">fashion</option>
              <option value="sporty">sporty</option>
              <option value="cute">cute</option>
                <option value="decoration">decoration</option>
              </select>


              <label>Trait 4</label>
              <select>
              <option value="geek">geek</option>
              <option value="introvert">introvert</option>
              <option value="outdoor">outdoor</option>
              <option value="fooder">fooder</option>
              <option value="musician">musician</option>
              <option value="fashion">fashion</option>
              <option value="sporty">sporty</option>
              <option value="cute">cute</option>
                <option value="decoration">decoration</option>
              </select>


             <h2>relationship</h2>

               <select>
               <option value="friend">friend</option>
               <option value="relative">relative</option>
               <option value="girlfriend">girlfriend</option>
               <option value="boyfriend">boyfriend</option>
               <option value="mom">mom</option>
               <option value="dad">dad</option>
               </select>

             <h2>Gender</h2>
               <select>
               <option value="male">male</option>
               <option value="female">female</option>
               <option value="other">other</option>
               </select>

               <button>submit</button>


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
 bubblesArray:state.bubblesArray
}
}

var QueryPosterContainer= connect(mapStateToProps)(QueryPoster)

module.exports = QueryPosterContainer;
