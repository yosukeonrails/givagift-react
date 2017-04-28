require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var giftListArray;
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import SignUpContainer from './sign-up.js'
import SignUpLoginContainer from './signup-login.js'
import UserSignUpContainer from './user-signup.js'
import LoginContainer from './login.js'
import {getGiftLists, SetQuery} from '../actions/index.js'
import ListContainer from './list.js'

var renderGiftLists= function(giftlists , index){


        if(!giftlists[index]){

            return ;
        }


        giftListArray.push(<ListContainer index={index} listInfo={giftlists[index]}/ >);

          renderGiftLists(giftlists , index+1)
   };

export class UserLists extends React.Component{

  constructor(props){
    super(props);


  }

  componentWillMount(){
    var dis= this;

 giftListArray=[];
        this.props.dispatch(getGiftLists(dis.props.user)).then(function(){

        renderGiftLists(dis.props.giftlists , 0);

          dis.setState({random:'random'})
        });

  }


  render () {

    return(

      <div>

	<div className="lists">

          {giftListArray}

	</div>
      </div>

    )
  }


}


  var mapStateToProps= function(state){


        return {
            loggedUser:state.loggedUser,
            giftlists:state.giftlists
        }

  };

   var UserListsContainer= connect(mapStateToProps)( UserLists);

export default UserListsContainer;
