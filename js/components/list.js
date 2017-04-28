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
import {getGiftLists, SetQuery} from '../actions/index.js'
const calendarMonths = ['January','February','March','April','May','June','July','August','September','October','November','December'];



export class List extends React.Component{

  constructor(props){
    super(props)

    this.goToResult= this.goToResult.bind(this);
    this.props.dispatch(getGiftLists(this.props.loggedUser.facebookId)).then(function(){

    });
  }

  componentDidMount(){

  }

  goToResult(event){

      this.props.dispatch(SetQuery(this.props.listInfo.amazon_results));
 hashHistory.push('/results/'+this.props.listInfo.amazon_results);
  }


  render () {

  var giftId=this.props.index;



    return(
      <div className="list-card-container">
              <div className="list-card w3-panel w3-card-4">

                <h1>{this.props.listInfo.friendName}</h1>


                                <div className="calendar-box">
                                <div className="calendar-month">
                                <h1>{calendarMonths[this.props.listInfo.birthday.month]}</h1>
                                </div>
                                <div className="calendar-day">
                                <h1> {this.props.listInfo.birthday.day}</h1>
                                </div>
                                </div>

                                  <h2>Lists</h2>

                                <div className="list-links">
                                    <button type="button" name="button">
                                    <i className="fa fa-list-alt" aria-hidden="true">
                                    </i>
                                    24 th Birthday
                                  </button>

                                  <button type="button" name="button">
                                  <i className="fa fa-list-alt" aria-hidden="true">
                                  </i>
                                  Christmas Gift
                                </button>

                          </div>

              </div>
      </div>



    );
  }
}


  var mapStateToProps= function(state){

        return {
            loggedUser:state.loggedUser,
            giftlists:state.giftlists
        }
  }

   var ListContainer= connect(mapStateToProps)( List);

export default  ListContainer;
