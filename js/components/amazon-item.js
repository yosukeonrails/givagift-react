var React = require('react');
import cssStyle from '../css-variables.js';
var orange='#ff7733';
import {connect} from 'react-redux';
import {getFacebookUser, layOutState, changeMode,logOut } from '../actions/index.js'
import SignInContainer from './sign-in.js'
import {push} from 'react-router-redux'
import {hashHistory} from 'react-router'
import FooterContainer from './footer.js'

export class AmazonItem extends React.Component{

constructor(props){
super(props);

  this.goTo= this.goTo.bind(this);


}

componentWillMount(){

}

goTo(link){

    window.open(link);

}



render () {

  var newTitleOfItem= this.props.name.substr(0, 21) + '....';
            // for each query 0-9

return(

              <div className="amazon-item" >

                        <div className="item-image" style={{ backgroundImage: 'url('  +this.props.pictureUrl+ ')'  }} id="toaster">
                        </div>

                        <div className="amazon-item-info">
                                <button><h1 onClick={ ()=>{this.goTo(this.props.buyLink) } }>{newTitleOfItem}</h1></button>
                                <h2> {this.props.price} </h2>
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
 callArray:state.callArray
}
}

var AmazonItemContainer= connect(mapStateToProps)(AmazonItem)

module.exports = AmazonItemContainer;
