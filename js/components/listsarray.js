require('babel-polyfill');

var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
import {push} from 'react-router-redux';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import SignUpContainer from './sign-up.js'
import SignUpLoginContainer from './signup-login.js'
import UserSignUpContainer from './user-signup.js'
import LoginContainer from './login.js'
import {getGiftLists} from '../actions/index.js'
import ListContainer from './list.js'
const calendarMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var giftListArray;
var renderGiftLists= function(giftlists , index){


        if(!giftlists[index]){

            return ;
        }



        giftListArray.push(<ListContainer index={index} listInfo={giftlists[index]}/ >);

          renderGiftLists(giftlists , index+1)
   };


export class ListsArray extends React.Component{

  constructor(props){
    super(props)


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
          {giftListArray}
        </div>
    );

  }
}


  var mapStateToProps= function(state){
        return {
            giftlists:state.giftlists,
            loggedUser:state.loggedUser
        }
  }

   var  ListsArrayContainer= connect(mapStateToProps)( ListsArray);

export default  ListsArrayContainer;
