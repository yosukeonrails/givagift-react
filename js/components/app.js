var React = require('react');
 import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser} from '../actions/index.js'


export class App extends React.Component{

  constructor(props){
    super(props);

       this.props.dispatch(getFacebookUser());
  }

  render () {

  var sideBar;

    if(this.props.user){

     sideBar= (
       <div style={{float:'left'}}>
        <UserSideBarContainer/>
       </div>
     );

    }


    return(

      <div className='main'>

          <div>
            {this.props.children}
          </div>

      </div>

    );
  }
}


var mapStateToProps= function(state){
   return {
     user:state.user
   }
}

var AppContainer= connect(mapStateToProps)(App)

module.exports = AppContainer;
